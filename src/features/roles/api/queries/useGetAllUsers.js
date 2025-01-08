import { Axios } from "@/axios";
import { useQuery } from "react-query";

export const useGetAllUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-users"],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return (await Axios.get("/users")).data.data;
    },
  });
  return {
    data,
    isLoading,
  };
};
