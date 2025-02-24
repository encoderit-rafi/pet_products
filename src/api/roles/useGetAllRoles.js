import { Axios } from "@/axios";
import { omitEmpty } from "@/consts";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetAllRoles = () => {
  const [params, setParams] = useState({
    brand_ids: "",
    connect_role: "",
  });
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["`get-all-roles", params.brand_ids, params.connect_role],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return await Axios.get("/roles", {
        params: omitEmpty(params),
      });
    },
  });
  return {
    data,
    isLoading,
    isFetching,
    refetch,
    params,
    setParams,
  };
};
