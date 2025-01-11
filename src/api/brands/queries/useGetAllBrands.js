import { Axios } from "@/axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export const useGetAllBrands = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [params, setParams] = useState({
  //   page: searchParams.get("page") || PAGINATION.page,
  //   per_page: searchParams.get("per_page") || PAGINATION.per_page,
  // });
  // useEffect(() => {
  //   if (setToUrl) {
  //     setSearchParams(params);
  //   }
  // }, [params]);
  // const [params, setParams] = useState({
  //   sort_by: "asc",
  // });
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-brands"],
    retry: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return (await Axios.get("/brands")).data.data;
    },
    // onSuccess: (data)=>{
    //   localStorage.setItem("brands", JSON.stringify(data))
    // }
  });
  return {
    data,
    isLoading,
    // params,
    // setParams,
  };
};
