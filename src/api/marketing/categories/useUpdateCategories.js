import { Axios } from "@/axios";
import { toFormData } from "@/consts";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateCategories = () => {
  return useMutation({
    mutationKey: "update-categories",
    mutationFn: async ({ id, data }) => {
      // const body = toFormData({ ...data, _method: "PUT" });
      return await Axios.post(`/marketing-categories/${id}`, {
        ...data,
        _method: "PUT",
      });
    },
  });
};
