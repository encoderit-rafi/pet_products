import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/axios";
import { omitEmpty, toFormData } from "@/consts";
import { format } from "date-fns";
export const useCreateActivities = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "create-activities",
    mutationFn: async (item) => {
      const data = omitEmpty({
        ...item,
        // date: format(item.date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        date: format(item.date, "yyyy-MM-dd"),
      });
      console.log("🚀 ~ mutationFn: ~ data:", data);
      // const body = toFormData(data);
      return await Axios.post(`/marketing-activities`, data);
    },
  });
};
