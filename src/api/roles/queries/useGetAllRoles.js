import { Axios } from "@/axios";
import { useQuery } from "react-query";

export const useGetAllRoles = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-roles"],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (await Axios.get("/roles")).data;
    },
  });
  return {
    data,
    isLoading,
  };
};
