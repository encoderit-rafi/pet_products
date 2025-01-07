import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetAllBrands = () => {
  const [searchParams, setSearchParams] = useState({
    sort_by: "asc",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-brands", searchParams.sort_by],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (await Axios.get("/brands", { params: searchParams })).data.data;
    },
  });
  return {
    data,
    isLoading,
    searchParams,
    setSearchParams,
  };
};
