import { Axios } from "@/axios";
import { toFormData } from "@/consts";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "update-user",
    mutationFn: async ({ id, data }) => {
      const body = toFormData({ ...data, _method: "PUT" });
      return await Axios.post(`/users/${id}`, body);
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
