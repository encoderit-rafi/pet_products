import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeletePlatform = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "delete-platform",
    mutationFn: async (data) => {
      return await Axios.delete(`/marketing-platforms/${data.id}`, {
        _method: "DELETE",
      });
    },
  });
};
