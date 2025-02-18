import { useMutation } from "react-query";
import { Axios } from "@/axios";
import { toFormData } from "@/consts";

export const useCreateStandType = () => {
  return useMutation({
    mutationKey: "create-stand-types",
    mutationFn: async (data) => {
      const body = toFormData(data);
      return await Axios.post(`/stand-types`, body);
    },
  });
};
