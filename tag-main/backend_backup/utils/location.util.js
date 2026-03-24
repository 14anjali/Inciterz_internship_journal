import geoip from "geoip-lite";
import axios from "axios";

export const getClientIp = (req) => {
  const headerIp =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  
  let ipAddress = headerIp || req.socket.remoteAddress || "";
  
  // Clean up IPv6 mapped IPv4
  if (ipAddress && ipAddress.startsWith("::ffff:")) {
    ipAddress = ipAddress.replace("::ffff:", "");
  }

  // If primary IP is IPv6, try to find an IPv4 fallback
  if (!ipAddress.includes('.')) {
      const pseudoIpv4 = req.headers["cf-pseudo-ipv4"];
      if (pseudoIpv4) {
          return `${pseudoIpv4} / ${ipAddress}`;
      }
      
      const forwardedFor = req.headers["x-forwarded-for"];
      if (forwardedFor) {
          const ips = forwardedFor.split(',').map(ip => ip.trim());
          const ipv4 = ips.find(ip => ip.includes('.') && !ip.startsWith("::ffff:"));
          if (ipv4) {
              return `${ipv4} / ${ipAddress}`;
          }
      }
  }

  // Attempt to capture both IPv4 and IPv6 if available
  const ipv6 = req.headers["cf-connecting-ipv6"] || null;
  if (ipv6 && ipv6 !== ipAddress && ipAddress.includes('.')) {
      return `${ipAddress} / ${ipv6}`;
  }

  if (ipAddress === "::1") {
    return "127.0.0.1";
  }
  return ipAddress;
};

// Internal helper for local lookup
const getLocalGeo = (ipString) => {
  const ips = ipString.split('/').map(s => s.trim());
  let geo = geoip.lookup(ips[0]);
  if (!geo && ips[1]) {
      geo = geoip.lookup(ips[1]);
  }
  if (!geo) return null;
  const city = geo.city;
  const state = geo.region;
  return {
    country_code: geo.country || null,
    region: city ? `${city}, ${state || ""}` : state || null,
    latitude: geo.ll?.[0] ?? null,
    longitude: geo.ll?.[1] ?? null,
  };
};

export const getGeoFromRequest = (req) => {
  // 1️⃣ Cloudflare (partial info)
  if (req.headers["cf-ipcountry"]) {
    return {
      country_code: req.headers["cf-ipcountry"],
      region: null,
      latitude: null,
      longitude: null,
    };
  }

  // 2️⃣ GeoIP lookup
  const fullIp = getClientIp(req);
  return getLocalGeo(fullIp);
};

// Async helper to get best possible location (External > Local)
export const getGeoLocation = async (ipString) => {
    if (!ipString) return null;
    
    const ips = ipString.split('/').map(s => s.trim());
    
    // 1. Try External API (Prioritized for accuracy)
    try {
        for (const ip of ips) {
             if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) continue;
             
             // Primary: ip-api.com
             try {
                const res = await axios.get(`http://ip-api.com/json/${ip}`, { timeout: 1500 });
                if (res.data && res.data.status === 'success') {
                    const city = res.data.city;
                    const state = res.data.regionName;
                    return {
                        country_code: res.data.countryCode,
                        region: city ? `${city}, ${state || ""}` : state,
                        latitude: res.data.lat,
                        longitude: res.data.lon
                    };
                }
             } catch (e) {
                 console.warn(`[GeoLocation] Primary API failed for ${ip}: ${e.message}`);
             }

             // Secondary: ipwho.is (Free, no key, 10k/month)
             try {
                const res = await axios.get(`http://ipwho.is/${ip}`, { timeout: 1500 });
                if (res.data && res.data.success) {
                    const city = res.data.city;
                    const state = res.data.region;
                    return {
                        country_code: res.data.country_code,
                        region: city ? `${city}, ${state || ""}` : state,
                        latitude: res.data.latitude,
                        longitude: res.data.longitude
                    };
                }
             } catch (e) {
                 console.warn(`[GeoLocation] Secondary API failed for ${ip}: ${e.message}`);
             }
        }
    } catch (e) {
        // Ignore global errors
    }

    // 2. Fallback to Local GeoIP
    return getLocalGeo(ipString);
};

