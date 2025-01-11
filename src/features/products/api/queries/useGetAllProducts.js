import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllProducts = ({ setToUrl, isEnabled, initailParams }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState(() => {
    const queryParams = {
      page: searchParams.get("page") || PAGINATION.page,
      per_page: searchParams.get("per_page") || PAGINATION.per_page,
    };
    const search = searchParams.get("search");
    const brand_id = searchParams.get("brand_id");
    const category_id = searchParams.get("category_id");

    if (search) {
      queryParams.search = search;
    }
    if (brand_id) {
      queryParams.brand_id = brand_id;
    }
    if (category_id) {
      queryParams.category_id = category_id;
    }

    return queryParams;
  });


  useEffect(() => {
    if (setToUrl) {
      setSearchParams(params);
    }
  }, [params]);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [`get-all-users-products-page_${params.page}-per_page_${params.per_page}-search_${params?.search}-brand_id_${params?.brand_id}-category_id_${params?.category_id}`],
    enabled: isEnabled,
    retry: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
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
