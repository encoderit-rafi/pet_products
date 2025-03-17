import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteActivities = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "delete-activities",
    mutationFn: async (data) => {
      return await Axios.delete(`/marketing-activities/${data.id}`, {
        _method: "DELETE",
      });
    },
  });
};
