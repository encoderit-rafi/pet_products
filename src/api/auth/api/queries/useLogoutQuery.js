import { Axios } from "@/axios";
import { useAuth } from "@/context/AuthProvider";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

//* [logout user]
export const useLogoutQuery = () => {
 const queryClient = useQueryClient();
 const navigate = useNavigate();
 const { setToken, setUser } = useAuth();
 return useQuery({
  queryKey: ["logout-user"],
  enabled: false,
  retry: false,
  keepPreviousData: false,

  queryFn: async () => {
   await Axios.get("/auth/logout");
  },
  onSuccess() {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   queryClient.clear();
   setUser(null);
   setToken(null);
   navigate("/login");
   // toast.success("Logged out successfully");
  },
 });
};