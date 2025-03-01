import { Axios } from "@/axios";
import { omitEmpty, PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllUsers = ({ setToUrl, isEnabled }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    // type: searchParams.get("type") || "user",
    page: searchParams.get("page") || PAGINATION.page,
    per_page: searchParams.get("per_page") || PAGINATION.per_page,
  });
  useEffect(() => {
    if (setToUrl) {
      setSearchParams(params);
    }
  }, [params]);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      `get-all-users-page-${params.page}-per_page-${params.per_page}-connect_role=${params.connect_role}`,
    ],
    enabled: isEnabled,
    retry: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    queryFn: async () => {
      return (
        await Axios.get("/users", {
          params: omitEmpty(params),
        })
      ).data.data;
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
