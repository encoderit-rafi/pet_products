import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import { toFormData } from "@/consts";
export const useCreatePlatform = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "create-platform",
    mutationFn: async (data) => {
      // const body = toFormData(data);
      return await Axios.post(`/marketing-platforms`, data);
    },
  });
};
