import { useEffect, useRef, useState, useCallback } from "react";
import { privateSocket } from "../socket/privateInstance";

interface UseWebRTCProps {
  userId: string | null;
  onCallEnded?: () => void;
}

interface IncomingCallState {
  from: string;
  name: string;
  signal: RTCSessionDescriptionInit;
  isVideo: boolean;
  callId?: string;
}

const buildRtcConfig = (): RTCConfiguration => {
  const turnUrls = (import.meta.env.VITE_TURN_URL || "")
    .split(",")
    .map((url: string) => url.trim())
    .filter(Boolean);
  const turnUsername = import.meta.env.VITE_TURN_USERNAME || "";
  const turnCredential = import.meta.env.VITE_TURN_CREDENTIAL || "";

  const iceServers: RTCIceServer[] = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ];

  if (turnUrls.length > 0 && turnUsername && turnCredential) {
    iceServers.push({
      urls: turnUrls,
      username: turnUsername,
      credential: turnCredential,
    });
  }

  return {
    iceServers,
    bundlePolicy: "max-bundle",
    rtcpMuxPolicy: "require",
  };
};

const generateCallId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `call_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

export const useWebRTC = ({ userId, onCallEnded }: UseWebRTCProps) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [incomingCall, setIncomingCall] = useState<IncomingCallState | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [connectionState, setConnectionState] = useState<string>("new");

  const rtcConfigRef = useRef<RTCConfiguration>(buildRtcConfig());
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const remoteUserId = useRef<string | null>(null);
  const currentCallId = useRef<string | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteCombinedStreamRef = useRef<MediaStream | null>(null);
  const iceCandidatesQueue = useRef<RTCIceCandidateInit[]>([]);
  const onCallEndedRef = useRef(onCallEnded);
  const hasRetriedIceRestartRef = useRef(false);

  useEffect(() => {
    onCallEndedRef.current = onCallEnded;
  }, [onCallEnded]);

  const stopLocalTracks = useCallback(() => {
    const stream = localStreamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    localStreamRef.current = null;
    setLocalStream(null);
  }, []);

  const cleanupPeerConnection = useCallback(() => {
    if (peerConnection.current) {
      peerConnection.current.onicecandidate = null;
      peerConnection.current.ontrack = null;
      peerConnection.current.onconnectionstatechange = null;
      peerConnection.current.oniceconnectionstatechange = null;
      peerConnection.current.close();
      peerConnection.current = null;
    }

    iceCandidatesQueue.current = [];
    remoteCombinedStreamRef.current = null;
    setRemoteStream(null);
    hasRetriedIceRestartRef.current = false;
  }, []);

  const processIceQueue = useCallback(async () => {
    if (!peerConnection.current || !peerConnection.current.remoteDescription) return;

    while (iceCandidatesQueue.current.length > 0) {
      const candidate = iceCandidatesQueue.current.shift();
      if (candidate) {
        try {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (error) {
          console.error("Failed to add queued ICE candidate:", error);
        }
      }
    }
  }, []);

  const endCall = useCallback(
    (notifyRemote: boolean = true) => {
      if (notifyRemote && remoteUserId.current && currentCallId.current) {
        privateSocket.emit("end-call", {
          to: remoteUserId.current,
          callId: currentCallId.current,
        });
      }

      stopLocalTracks();
      cleanupPeerConnection();
      setIncomingCall(null);
      setIsCallActive(false);
      setConnectionState("new");
      remoteUserId.current = null;
      currentCallId.current = null;

      onCallEndedRef.current?.();
    },
    [cleanupPeerConnection, stopLocalTracks],
  );

  const createPeerConnection = useCallback(
    (targetUserId: string, callId: string) => {
      if (peerConnection.current) return peerConnection.current;

      const pc = new RTCPeerConnection(rtcConfigRef.current);
      remoteUserId.current = targetUserId;
      currentCallId.current = callId;

      pc.onicecandidate = (event) => {
        if (event.candidate && remoteUserId.current && currentCallId.current) {
          privateSocket.emit("ice-candidate", {
            candidate: event.candidate.toJSON(),
            to: remoteUserId.current,
            callId: currentCallId.current,
          });
        }
      };

      pc.ontrack = (event) => {
        if (!remoteCombinedStreamRef.current) {
          remoteCombinedStreamRef.current = new MediaStream();
        }

        const stream = remoteCombinedStreamRef.current;
        if (!stream.getTrackById(event.track.id)) {
          stream.addTrack(event.track);
        }
        setRemoteStream(new MediaStream(stream.getTracks()));
      };

      pc.onconnectionstatechange = async () => {
        setConnectionState(pc.connectionState);

        if (pc.connectionState === "failed" && !hasRetriedIceRestartRef.current) {
          hasRetriedIceRestartRef.current = true;
          try {
            const offer = await pc.createOffer({ iceRestart: true });
            await pc.setLocalDescription(offer);
            if (remoteUserId.current && currentCallId.current) {
              privateSocket.emit("call-renegotiate", {
                to: remoteUserId.current,
                signalData: offer,
                callId: currentCallId.current,
              });
            }
            return;
          } catch (error) {
            console.error("ICE restart failed:", error);
          }
        }

        if (pc.connectionState === "failed" || pc.connectionState === "closed") {
          endCall(false);
        }
      };

      pc.oniceconnectionstatechange = () => {
        if (pc.iceConnectionState === "disconnected") {
          setConnectionState("disconnected");
        }
      };

      peerConnection.current = pc;
      return pc;
    },
    [endCall],
  );

  const getUserMediaWithType = useCallback(async (withVideo: boolean) => {
    return navigator.mediaDevices.getUserMedia({
      video: withVideo
        ? {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 24, max: 30 },
          }
        : false,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
  }, []);

  const startCall = useCallback(
    async (userToCall: string, video: boolean = true) => {
      if (!userId || !userToCall) return;

      try {
        if (isCallActive || incomingCall) {
          endCall(false);
        }

        const callId = generateCallId();
        const stream = await getUserMediaWithType(video);
        localStreamRef.current = stream;
        setLocalStream(stream);
        setIsAudioEnabled(true);
        setIsVideoEnabled(video);
        setIsCallActive(true);
        setConnectionState("connecting");

        const pc = createPeerConnection(userToCall, callId);
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        privateSocket.emit("call-user", {
          userToCall,
          signalData: offer,
          name: localStorage.getItem("name") || "User",
          isVideo: video,
          callId,
        });
      } catch (error) {
        console.error("Error starting call:", error);
        endCall(false);
      }
    },
    [createPeerConnection, endCall, getUserMediaWithType, incomingCall, isCallActive, userId],
  );

  const answerCall = useCallback(async () => {
    if (!incomingCall) return;

    try {
      const callId = incomingCall.callId || generateCallId();
      const stream = await getUserMediaWithType(incomingCall.isVideo);
      localStreamRef.current = stream;
      setLocalStream(stream);
      setIsVideoEnabled(incomingCall.isVideo);
      setIsAudioEnabled(true);
      setIsCallActive(true);
      setConnectionState("connecting");

      const pc = createPeerConnection(incomingCall.from, callId);
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
      await processIceQueue();

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      privateSocket.emit("answer-call", {
        signal: answer,
        to: incomingCall.from,
        callId,
      });

      setIncomingCall(null);
    } catch (error) {
      console.error("Error answering call:", error);
      endCall(false);
    }
  }, [createPeerConnection, endCall, getUserMediaWithType, incomingCall, processIceQueue]);

  const rejectCall = useCallback(() => {
    if (incomingCall?.from) {
      privateSocket.emit("reject-call", {
        to: incomingCall.from,
        callId: incomingCall.callId,
      });
    }
    setIncomingCall(null);
  }, [incomingCall]);

  const toggleVideo = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;

    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  }, []);

  const toggleAudio = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;

    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const handleCallReceived = (data: IncomingCallState) => {
      if (isCallActive || !!peerConnection.current) {
        privateSocket.emit("call-busy", { to: data.from, callId: data.callId });
        return;
      }

      setIncomingCall({
        from: data.from,
        name: data.name,
        signal: data.signal,
        isVideo: data.isVideo,
        callId: data.callId,
      });
    };

    const handleCallAnswered = async (data: { signal: RTCSessionDescriptionInit; callId?: string }) => {
      if (!peerConnection.current) return;
      if (data.callId && currentCallId.current && data.callId !== currentCallId.current) return;

      try {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.signal));
        await processIceQueue();
      } catch (error) {
        console.error("Error handling call answer:", error);
      }
    };

    const handleRenegotiation = async (data: { signal: RTCSessionDescriptionInit; from: string; callId?: string }) => {
      if (!peerConnection.current) return;
      if (data.callId && currentCallId.current && data.callId !== currentCallId.current) return;

      try {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.signal));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        privateSocket.emit("answer-call", {
          signal: answer,
          to: data.from,
          callId: data.callId || currentCallId.current,
        });
      } catch (error) {
        console.error("Error in renegotiation:", error);
      }
    };

    const handleIceCandidate = async (data: { candidate: RTCIceCandidateInit; callId?: string }) => {
      if (data.callId && currentCallId.current && data.callId !== currentCallId.current) return;

      if (peerConnection.current && peerConnection.current.remoteDescription) {
        try {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (error) {
          console.error("Error adding remote ICE candidate:", error);
        }
      } else {
        iceCandidatesQueue.current.push(data.candidate);
      }
    };

    const handleCallEnded = () => {
      endCall(false);
    };

    const handleCallFailed = () => {
      endCall(false);
    };

    const handleCallRejected = () => {
      endCall(false);
    };

    privateSocket.on("call-received", handleCallReceived);
    privateSocket.on("call-answered", handleCallAnswered);
    privateSocket.on("call-renegotiate", handleRenegotiation);
    privateSocket.on("ice-candidate-received", handleIceCandidate);
    privateSocket.on("call-ended", handleCallEnded);
    privateSocket.on("call-failed", handleCallFailed);
    privateSocket.on("call-rejected", handleCallRejected);

    return () => {
      privateSocket.off("call-received", handleCallReceived);
      privateSocket.off("call-answered", handleCallAnswered);
      privateSocket.off("call-renegotiate", handleRenegotiation);
      privateSocket.off("ice-candidate-received", handleIceCandidate);
      privateSocket.off("call-ended", handleCallEnded);
      privateSocket.off("call-failed", handleCallFailed);
      privateSocket.off("call-rejected", handleCallRejected);
    };
  }, [endCall, isCallActive, processIceQueue, userId]);

  useEffect(() => {
    return () => {
      endCall(false);
    };
  }, [endCall]);

  return {
    localStream,
    remoteStream,
    isCallActive,
    incomingCall,
    startCall,
    answerCall,
    rejectCall,
    endCall,
    toggleVideo,
    toggleAudio,
    isVideoEnabled,
    isAudioEnabled,
    connectionState,
  };
};
