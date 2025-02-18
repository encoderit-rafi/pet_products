import { useMutation } from "react-query";
import { Axios } from "@/axios";
import { toFormData } from "@/consts";
export const useCreateStand = () => {
  return useMutation({
    mutationKey: "create-stand",
    mutationFn: async (data) => {
      const body = toFormData(data);
      return await Axios.post(`/stands`, body);
    },
  });
};
