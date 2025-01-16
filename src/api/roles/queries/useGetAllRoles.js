import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetAllRoles = () => {
  const [params, setParams] = useState({
    brand_ids: ""
  })
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-all-roles"],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (await Axios.get("/roles", {
        params
      })).data;
    },
  });
  return {
    data,
    isLoading,
    refetch,
    params, setParams
  };
};
