import { Axios } from "@/axios";
import { useMutation } from "react-query";

export const useDeleteRole = () => {
  return useMutation({
    mutationKey: "delete-role",
    mutationFn: async (user) => {
      return await Axios.delete(`/roles/${user.id}`);
    },
  });
};
