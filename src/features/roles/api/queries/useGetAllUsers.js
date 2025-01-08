import { Axios } from "@/axios";
import { PAGINATION } from "@/consts";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllUsers = ({ setToUrl, isEnabled }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [states, setStates] = useState({
    page: searchParams.get("page") || PAGINATION.page,
    per_page: searchParams.get("per_page") || PAGINATION.per_page,

  })
  useEffect(() => {
    if (setToUrl) {
      setSearchParams(states)
    }
  }, [states])
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["get-all-users"],
    enabled: isEnabled,
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (await Axios.get("/users", {
        params: {
          page: states.page,
          per_page: states.per_page,
        }
      })).data;
    },
  });
  return {
    data,
    isLoading,
    isFetching,
    refetch,
    states,
    setStates
  };
};
