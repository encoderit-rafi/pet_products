import { useState } from "react";
import { useQuery } from "react-query";
import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
export const useGetAllTopClients = () => {
 const [params, setParams] = useState({
  range: "",
 });

 const { data, status, refetch } = useQuery({
  queryKey: [
   `get-all-top-clients-range_${params.range
   }-brand_ids_${params?.brand_id}`,
  ],
  enabled: false,
  retry: false,
  keepPreviousData: true,
  queryFn: async () => {
   return (await Axios.get("/analytic/top-clients", { params })).data
    .data;
  },
 });
 return {
  data,
  status,
  refetch,
  params,
  setParams,
 };
};
