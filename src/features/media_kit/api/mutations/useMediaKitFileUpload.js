import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import toast from "react-hot-toast";
import { toFormData } from "@/consts";
//* [create a new user]
export const useMediaKitFileUpload = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "file-upload",
    mutationFn: async ({ brandId, category, file }) => {
      const body = toFormData({ file });
      return await Axios.post(`/media-kit/upload/${brandId}/${category}`, body);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("get-all-users");
    },
    onError: (error) => {
      toast.error("file upload failed");
    },
  });
};
