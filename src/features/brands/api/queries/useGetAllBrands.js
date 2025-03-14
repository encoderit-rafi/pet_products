import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllBrands = ({ setToUrl, isEnabled }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState(() => {
    const queryParams = {
      page: searchParams.get("page") || PAGINATION.page,
      per_page: searchParams.get("per_page") || PAGINATION.per_page,
    };
    const search = searchParams.get("search");
    if (search) {
      queryParams.search = search;
    }
    return queryParams;
  });

  useEffect(() => {
    if (setToUrl) {
      setSearchParams(params);
    }
  }, [params]);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      `get-all-brands-page_${params.page}-per_page_${params.per_page}-search_${params?.search}`,
    ],
    enabled: isEnabled,
    retry: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      return (
        await Axios.get("/brands", {
          params,
        })
      ).data;
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
