import { videoApi } from "@/api/modules/video";
import { useQuery } from "@tanstack/react-query";

export const useVideoUsers = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["videoUsers", page, search],
    queryFn: () => videoApi.getVideoGuides(page, search),
    staleTime: 5 * 60 * 1000, // 5 mins
    gcTime: 10 * 60 * 1000, //cache time 10 mins
  });
};

export const useVideoUsersSorted = (page: number, sort: string, search?: string) => {
  return useQuery({
    queryKey: ["videoUsers", page, sort, search],
    queryFn: () => videoApi.getVideoGuides(page, search, sort),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
