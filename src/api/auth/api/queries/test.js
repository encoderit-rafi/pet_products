import { Axios } from "@/axios";
import { useQuery } from "react-query";

export const useAuthUserQuery = () => {
 return useQuery({
  queryKey: "auth-user",
  retry: false,
  enabled: false,
  keepPreviousData: true,
  initialData: () => {
   try {
    const user = JSON.parse(localStorage.getItem("user") || "");
    return user;
   } catch (error) {
    return null;
   }
  },
  queryFn: async () => {
   const user = (await Axios.get("/auth/user")).data.data;
   localStorage.setItem(
    "user",
    JSON.stringify(user)
   );
   return user;
  },
 });
};