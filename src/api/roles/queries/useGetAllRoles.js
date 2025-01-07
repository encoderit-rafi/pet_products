import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";

export const useGetAllRoles = () => {
  // const [searchParams, setSearchParams] = useState({
  //   sort_by: "asc",
  // });
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-roles"],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (await Axios.get("/roles")).data.data;
    },
  });
  return {
    data,
    isLoading,
    // searchParams,
    // setSearchParams,
  };
};
