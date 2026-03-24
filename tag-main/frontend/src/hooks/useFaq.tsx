import { faqApi } from "@/api/modules/faq";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

export const useFaq = (page: number, query: string = "") => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleFaqUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    };

    socket.on("faq-updated", handleFaqUpdate);

    return () => {
      socket.off("faq-updated", handleFaqUpdate);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["faqs", page, query],
    queryFn: () => faqApi.getAllFaq(page, query),
    staleTime: 5 * 60 * 1000, // 5 mins
    gcTime: 10 * 60 * 1000, //cache time 10 mins
  });
};

export const useAllFaqs = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleFaqUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    };

    socket.on("faq-updated", handleFaqUpdate);

    return () => {
      socket.off("faq-updated", handleFaqUpdate);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["faqs", "all"],
    queryFn: () => faqApi.getAllFaq(1, "", true),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
