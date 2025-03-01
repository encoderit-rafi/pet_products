import { Axios } from "@/axios";
import { omitEmpty } from "@/consts";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetAllRoles = ({ isEnabled = true }) => {
  const [params, setParams] = useState({
    brand_ids: "",
    connect_role: "",
  });
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["`get-all-roles", params.brand_ids, params.connect_role],
    retry: false,
    enabled: isEnabled,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
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
