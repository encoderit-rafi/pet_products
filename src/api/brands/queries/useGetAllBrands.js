import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllBrands = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    page: PAGINATION.page,
    per_page: PAGINATION.per_page,
    sort_by: "asc",
  });

  const { data, isLoading } = useQuery({
    queryKey: [`get-all-brands-page_${params.page}`],
    retry: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return (await Axios.get("/brands", { params })).data.data;
    },
  });
  return {
    data,
    isLoading,
    params,
    setParams,
  };
};

