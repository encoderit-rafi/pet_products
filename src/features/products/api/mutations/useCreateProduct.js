import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import { toFormData } from "@/consts";
//* [create a new user]
export const useCreateProduct = () => {

  return useMutation({
    mutationKey: "create-product",
    mutationFn: async (data) => {
      // const body = toFormData(data);
      return await Axios.post(`/product`, body);
    },

  });
};
