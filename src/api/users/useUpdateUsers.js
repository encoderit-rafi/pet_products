import { Axios } from "@/axios";
import { toFormData } from "@/consts";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "update-faqs",
    mutationFn: async ({ id, data }) => {
      const body = toFormData({ ...data, _method: "PUT" });
      return await Axios.post(`/users/${id}`, body);
    },
  });
};
