import { Axios } from "@/axios";
import { useMutation } from "react-query";

export const useDeleteRole = () => {
  return useMutation({
    mutationKey: "delete-role",
    mutationFn: async ({ id, data }) => {
      const body = { ...data, _method: "DELETE" };
      return await Axios.post(`/roles/${id}`, body);
    },
  });
};
