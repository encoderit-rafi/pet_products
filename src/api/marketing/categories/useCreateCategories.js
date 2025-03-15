import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import { toFormData } from "@/consts";
export const useCreateCategories = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "create-users",
    mutationFn: async (data) => {
      // const body = toFormData(data);
      return await Axios.post(`/marketing-categories`, data);
    },
  });
};
