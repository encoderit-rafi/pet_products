import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetAllCategories = () => {
  const [searchParams, setSearchParams] = useState({
    brand_id: "",
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`get-all-categories-${searchParams.brand_id}`],
    retry: false,
    keepPreviousData: false,
    enabled: false,
    queryFn: async () => {
      return (await Axios.get("/brands", { params: searchParams })).data.data;
    },
  });
  return {
    data,
    refetch,
    isLoading,
    searchParams,
    setSearchParams,
  };
};
