import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "delete-categories",
    mutationFn: async (data) => {
      return await Axios.delete(`/marketing-categories/${data.id}`, {
        _method: "DELETE",
      });
    },
  });
};
