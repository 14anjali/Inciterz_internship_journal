import { textApi } from "@/api/modules/text";
import { useQuery } from "@tanstack/react-query";

export const useTextGuidePublic = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["textsPublic", page, search],
    queryFn: () => textApi.getAllGuidesForUser(page, search),
    staleTime: 5 * 60 * 1000, // 5 mins
    gcTime: 10 * 60 * 1000, //cache time 10 mins
  });
};
