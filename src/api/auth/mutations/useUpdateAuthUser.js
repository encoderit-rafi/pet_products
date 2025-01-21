import { Axios } from "@/axios";
import { toFormData } from "@/consts";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateAuthUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "update-auth-user",
    mutationFn: async ({ data }) => {
      const body = toFormData({ ...data, _method: "PUT" });
      return await Axios.post(`/auth/user/profile-update`, body);
    },
    onSuccess: () => {
      // toast.success("User successfully updated");
      // queryClient.invalidateQueries("get-all-users");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
