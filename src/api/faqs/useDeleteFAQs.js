import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteFAQs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "delete-faq",
    mutationFn: async (id) => {
      return await Axios.delete(`/faqs/${id}`, { _method: "DELETE" });
    },
  });
};
