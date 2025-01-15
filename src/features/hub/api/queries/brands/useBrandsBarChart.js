import { useState } from "react";
import { useQuery } from "react-query";
import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
export const useBrandsBarChart = () => {
  const [params, setParams] = useState({
    range: "",
  });

  const { data, status, refetch } = useQuery({
    queryKey: [
      `get-all-brands-bar-chart-range_${
        params.range
      }-brand_ids_${params?.brand_ids?.join(",")}`,
    ],
    enabled: false,
    retry: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    queryFn: async () => {
      return (await Axios.get("/analytic/brands/brandchart", { params })).data
        .data;
    },
  });
  return {
    data,
    status,
    refetch,
    params,
    setParams,
  };
};
