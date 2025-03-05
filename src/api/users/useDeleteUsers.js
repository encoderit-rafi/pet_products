import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "delete-users",
    mutationFn: async (user) => {
      return await Axios.delete(`/users/${user.id}`, { _method: "DELETE" });
    },
  });
};
