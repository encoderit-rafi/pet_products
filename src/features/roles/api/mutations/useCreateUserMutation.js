import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { toFormData } from "@/consts";
//* [create a new user]
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "create-user",
    mutationFn: async (data) => {
      const body = toFormData({ ...data, is_brand_employee: 0 });
      return await Axios.post(`/users`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-users");
    },
    onError: (error) => {
      toast.error("user create failed");
    },
  });
};
