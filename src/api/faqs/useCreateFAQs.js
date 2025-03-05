import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { toFormData } from "@/consts";
//* [create a new user]
export const useCreateFAQs = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "create-faq",
    mutationFn: async (data) => {
      // const body = toFormData(data);
      return await Axios.post(`/faqs`, data);
    },
  });
};
