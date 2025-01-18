import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllFAQs = () => {

 return useQuery({
  queryKey: [
   `get-all-faqs`,
  ],
  enabled: true,
  retry: false,
  keepPreviousData: true,
  staleTime: 1000 * 60 * 10,
  cacheTime: 1000 * 60 * 10,
  queryFn: async () => {
   return (
    await Axios.get("/faqs")
   ).data;
  },
 });

};
