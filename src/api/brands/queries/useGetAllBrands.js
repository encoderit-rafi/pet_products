// import { Axios } from "@/axios";
// import { PAGINATION } from "@/consts";
// import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import { useSearchParams } from "react-router-dom";

// export const useGetAllBrands = () => {
//   const [params, setParams] = useState({
//     page: PAGINATION.page,
//     per_page: PAGINATION.per_page,
//     sort_by: "asc",
//   });

//   const { data, isLoading } = useQuery({
//     queryKey: [`get-all-brands-page_${params.page}`],
//     retry: false,
//     keepPreviousData: true,
//     staleTime: 1000 * 60 * 5,
//     queryFn: async () => {
//       return (await Axios.get("/brands", { params })).data.data;
//     },
//   });
//   return {
//     data,
//     isLoading,
//     params,
//     setParams,
//   };
// };

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

  const fetchBrands = async (props) => {
    console.log({ props })
    return await Axios.get(`/brands?page=${props.pageParam}`)
  }
  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [`get-all-brands-infinite`],
    enabled: true,
    queryFn: fetchBrands,
    initialPageParams: 1,
    getNextPageParam: (lastPage, allPage) => {
      console.log({ allPage })
      return allPage?.[0]?.data.current_page == allPage?.[0]?.data.last_page ? undefined : allPage?.[0]?.data.current_page + 1
    }
  });
  return {
    data, status, error, hasNextPage, fetchNextPage, isFetchingNextPage
  };
};

