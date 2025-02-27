import { Axios } from "@/axios";

import { useQuery } from "react-query";

export const useGetAllPermissions = () => {
  return useQuery({
    queryKey: ["get-all-permissions"],
    retry: false,
    keepPreviousData: false,
    queryFn: async () => {
      return await Axios.get("/roles/permissions");
    },
  });
};
