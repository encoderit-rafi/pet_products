import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllCategories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    brand_id: '',
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`get-all-categories-brand_id_${params.brand_id}`],
    retry: false,
    keepPreviousData: false,
    enabled: !!params.brand_id,
    queryFn: async () => {
      return (await Axios.get("/categories", { params: params })).data;
    },
  });
  return {
    data,
    refetch,
    isLoading,
    params,
    setParams,
  };
};
