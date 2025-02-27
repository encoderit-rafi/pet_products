import { Axios } from "@/axios";
import { toFormData } from "@/consts";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "update-role",
    mutationFn: async ({ id, data }) => {
      const body = toFormData({ ...data, _method: "PUT" });
      return await Axios.post(`/roles/${id}`, body);
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
