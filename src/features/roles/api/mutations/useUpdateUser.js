import { Axios } from "@/axios";
import { useQueryClient } from "react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "update-user",
    mutationFn: async ({ id, data }) => {
      return await Axios.post(`/users/${id}`, data);
    },
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries("get-all-users");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
