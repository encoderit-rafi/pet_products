import { useState } from "react";
import { useQuery } from "react-query";
import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
export const useGetAllBrands = () => {
  const [params, setParams] = useState({
    page: PAGINATION.page,
    per_page: 1000,
    sort_by: "asc",
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`get-all-brands-page_${params.page}`],
    retry: false,
    keepPreviousData: false,
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      return (await Axios.get("/brands", { params })).data.data;
    },
  });
  return {
    data,
    isLoading,
    isFetching,
    params,
    setParams,
  };
};
