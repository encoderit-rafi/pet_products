import { Axios } from "@/axios";
import { useMutation } from "react-query";

export const useDeleteMediaKit = () => {
  return useMutation({
    mutationKey: "delete-media-kit",
    mutationFn: async ({ brandId, category, fileName }) => {
      return await Axios.post(
        `/media-kit/delete/${brandId}/${category}/${fileName}`,
        {
          _method: "DELETE",
        }
      );
    },
  });
};
