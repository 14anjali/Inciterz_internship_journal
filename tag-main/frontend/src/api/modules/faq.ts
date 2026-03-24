import { approvalIds, FaqPayload, FaqResponse } from "../apiTypes";
import httpClient from "../axiosSetup";

export const faqApi = {
  getAllFaq: async (page: number, query: string = "", all:boolean = false) => {
    const res = await httpClient.get<FaqResponse>(
      `/api/faqs/get-faq?page=${page}&q=${query}&all=${all}`,
      {
        headers: { useAuth: true },
      }
    );
    return res.data;
  },

  createFaq: async (data: FaqPayload) => {
    const res = await httpClient.post<any>(`/api/faqs/create-faq`, data, {
      headers: { useAuth: true },
    });
    return res.data;
  },

  deleteFaq: async (data: approvalIds) => {
    const res = await httpClient.post<any>(`/api/faqs/delete-faq`, data, {
      headers: { useAuth: true },
    });
    return res.data;
  },
};
