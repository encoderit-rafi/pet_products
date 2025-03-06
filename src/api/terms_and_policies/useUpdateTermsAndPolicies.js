import { Axios } from "@/axios";
import { toFormData } from "@/consts";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateTermsAndPolicies = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "update-terms-and-policies",
    mutationFn: async ({ id, data }) => {
      // const body = toFormData({ ...data, _method: "PUT" });
      return await Axios.post(`/privacy-terms`, { ...data, _method: "PUT" });
    },
    // onSuccess: () => {
    //   // toast.success("User successfully updated");
    //   // queryClient.invalidateQueries("get-all-users");
    // },
    // onError: (error) => {
    //   toast.error(error.response.data.message);
    // },
  });
};
