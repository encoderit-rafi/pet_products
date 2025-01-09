import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "delete-user",
    mutationFn: async (user) => {
      return await Axios.delete(`/users/${user.id}`);
    },
    onSuccess: (data) => {

      toast.success('User successfully deleted');
      // queryClient.invalidateQueries("get-all-users");
    },
    onError: (error) => {
      console.log("ERROR::", error)
      toast.error(error.response.data.message);
    },
  });
};
