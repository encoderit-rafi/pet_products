import { Axios } from "@/axios";
import { toFormData } from "@/consts";
import { useMutation, useQueryClient } from "react-query";

export const useUpdatePlatform = () => {
  return useMutation({
    mutationKey: "update-platform",
    mutationFn: async ({ id, data }) => {
      // const body = toFormData({ ...data, _method: "PUT" });
      return await Axios.post(`/marketing-platforms/${id}`, {
        ...data,
        _method: "PUT",
      });
    },
  });
};
