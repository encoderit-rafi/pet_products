import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetAllRoles = () => {
  // const [params, setParams] = useState({
  //   brand_ids: "",
  //   connect_role: "",
  // });
  const [params, setParams] = useState({
    // brand_ids: "",
    // connect_role: "",
  });
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      `get-all-roles-brand_ids-${params.brand_ids}-connect_role-${params.connect_role}`,
    ],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return await Axios.get("/roles", {
        params,
      });
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
