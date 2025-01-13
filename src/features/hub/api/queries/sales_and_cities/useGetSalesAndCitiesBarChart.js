import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetSalesAndCitiesBarChart = () => {
  const [searchParams, setSearchParams] = useState({
    range: "this_week",
    brand_id: "4",
  });
  const { data, isLoading } = useQuery({
    queryKey: [
      "get-sales-and-cities-bar-chart",
      searchParams.range,
      searchParams.brand_id,
    ],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (
        await Axios.get("/distributions/barchart", { params: searchParams })
      ).data.data;
    },
  });
  return {
    data,
    isLoading,
    searchParams,
    setSearchParams,
  };
};
