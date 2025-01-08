import { Axios } from "@/axios";
import { useQueryClient } from "react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "delete-user",
    mutationFn: async (user) => {
      return await Axios.delete(`/users/${user.id}`);
    },
    onSuccess: () => {
      toast.success("User successfully deleted");
      queryClient.invalidateQueries("get-all-users");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
