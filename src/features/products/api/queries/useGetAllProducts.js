import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllProducts = ({ setToUrl, isEnabled, initailParams }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    page: searchParams.get("page") || PAGINATION.page,
    per_page: searchParams.get("per_page") || PAGINATION.per_page,
    // brand_id: searchParams.get("brand_id") || null,
  });
  useEffect(() => {
    if (setToUrl) {
      setSearchParams(params);
    }
  }, [params]);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [`get-all-users-products-page_${params.page}-per_page_${params.per_page}`],
    enabled: isEnabled,
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (
        await Axios.get("/products", {
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
