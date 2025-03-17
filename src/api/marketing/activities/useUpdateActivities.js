import { Axios } from "@/axios";
import { toFormData } from "@/consts";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateActivities = () => {
  return useMutation({
    mutationKey: "update-activities",
    mutationFn: async ({ id, data }) => {
      // const body = toFormData({ ...data, _method: "PUT" });
      return await Axios.post(`/marketing-activities/${id}`, {
        ...data,
        _method: "PUT",
      });
    },
  });
};
