import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import { toFormData } from "@/consts";
export const useCreateActivities = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "create-activities",
    mutationFn: async (data) => {
      // const body = toFormData(data);
      return await Axios.post(`/marketing-activities`, data);
    },
  });
};
