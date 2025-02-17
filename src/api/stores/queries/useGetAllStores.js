import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetAllStores = () => {
  const [params, setParams] = useState({});
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-all-stores"],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (
        await Axios.get("/clients", {
          params,
        })
      ).data;
    },
  });
  return {
    data,
    isLoading,
    refetch,
    params,
    setParams,
  };
};
