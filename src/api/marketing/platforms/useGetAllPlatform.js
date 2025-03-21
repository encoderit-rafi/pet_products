import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllPlatform = ({ setToUrl, isEnabled, all }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    page: searchParams.get("page") || PAGINATION.page,
    per_page: all ? 1000 : searchParams.get("per_page") || PAGINATION.per_page,
  });

  // useEffect(() => {
  //   if (setToUrl) {
  //     setSearchParams(params);
  //   }
  // }, [params]);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      `get-all-marketing-platform-page_${params.page}-per_page_${params.per_page}-category_id-${params.category_id}`,
    ],
    enabled: isEnabled,
    retry: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      return (
        await Axios.get("/marketing-platforms", {
          params,
        })
      ).data.platforms;
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
