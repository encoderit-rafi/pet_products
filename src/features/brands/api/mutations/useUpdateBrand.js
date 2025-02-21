// import { Axios } from "@/axios";
// import { toFormData } from "@/consts";
// import { useMutation, } from "react-query";

// export const useUpdateProduct = () => {
//   return useMutation({
//     mutationKey: "update-product",
//     mutationFn: async ({ id, data }) => {
//       const body = toFormData({ ...data, _method: "PUT" });
//       return await Axios.post(`/product/${id}`, body);
//     },
//   });
// };
