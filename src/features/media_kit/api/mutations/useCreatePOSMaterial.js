import { useMutation } from "react-query";
import { Axios } from "@/axios";
import { toFormData } from "@/consts";
export const useCreatePOSMaterial = () => {
  return useMutation({
    mutationKey: "create-pos-materials",
    mutationFn: async (data) => {
      const body = toFormData(data);
      return await Axios.post(`/pos-materials`, body);
    },
  });
};
