import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllBrands = () => {
  const [params, setParams] = useState({
    page: PAGINATION.page,
    per_page: PAGINATION.per_page,
    sort_by: "asc",
  });

  const { data, isLoading } = useQuery({
    queryKey: [`get-all-brands-page_${params.page}`],
    retry: false,
    keepPreviousData: false,
    // staleTime: 1000 * 60 * 5,
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
export const useGetAllBrandsInfinite = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["get-all-brands-infinite"],
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await Axios.get(`/brands`, {
        params: {
          page: pageParam,
          per_page: 20,
          sort_by: "asc",
        },
      });
      return response?.data;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.current_page;
      const lastPageNumber = lastPage?.last_page;

      if (currentPage && currentPage < lastPageNumber) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
  return {
    data,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
