import { useQuery } from "react-query";
import { Axios } from "@/axios";
export const useGetTermsAndPolicies = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`get-terms-and-policies`],
    retry: false,
    keepPreviousData: false,
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      return (await Axios.get("/privacy-terms")).data.data;
    },
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
