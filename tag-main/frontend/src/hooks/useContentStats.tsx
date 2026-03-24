import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import httpClient from "@/api/axiosSetup";

interface ContentStatsResponse {
  totalSpecies: number;
  mediaFiles: number;
  images: number;
  forumPosts: number;
  aquaticPlants: number;
}

const fetchContentStats = async (): Promise<ContentStatsResponse> => {
  const res = await httpClient.get<ContentStatsResponse>("/stats/content", {
    headers: { useAuth: true },
  });
  return res.data;
};

export const useContentStats = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleUpdate = (data: ContentStatsResponse) => {
      if (data) {
        queryClient.setQueryData(["contentStats"], data);
      }
    };

    socket.on("contentStatsUpdate", handleUpdate);
    return () => {
      socket.off("contentStatsUpdate", handleUpdate);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["contentStats"],
    queryFn: fetchContentStats,
    refetchInterval: 30000,
  });
};