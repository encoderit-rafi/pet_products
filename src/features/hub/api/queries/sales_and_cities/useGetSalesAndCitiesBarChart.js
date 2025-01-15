import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetSalesAndCitiesBarChart = () => {
  const [params, setParams] = useState({
    brand_id: "",
    range: "",
  });
  const { data, status, refetch } = useQuery({
    queryKey: [
      `get-sales-and-cities-bar-chart-brand_id_${params.brand_id}-range_${params.range}`
    ],
    enabled: false,
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (
        await Axios.get("/distributions/barchart", { params })
      ).data;
    },
  });
  return {
    data, status, refetch,
    params, setParams
  };
};
