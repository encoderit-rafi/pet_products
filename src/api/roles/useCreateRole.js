import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { toFormData } from "@/consts";
//* [create a new user]
export const useCreateRole = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "create-role",
    mutationFn: async (data) => {
      // const body = toFormData(data);
      return await Axios.post(`/roles`, data);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("get-all-users");
    },
    onError: (error) => {
      toast.error("role create failed");
    },
  });
};
