import { useMutation } from "react-query";
import { Axios } from "@/axios";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
// import { useAuth } from "../../provider/AuthProvider";

//* [login user]
export const useLoginMutation = () => {
  return useMutation({
    mutationKey: "login",
    retry: false,
    mutationFn: async (data) => {
      return await Axios.post("/auth/login", data).then((response) => {
        return response;
      });
    },
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.data.token);
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};

//* [create a new user]
// export const useNewRegistrationMutation = () => {
//   return useMutation({
//     mutationKey: "new-registration",
//     mutationFn: async (data) => {
//       return await Axios.post(`/register`, data);
//     },
//     onSuccess: (data) => {
//       // localStorage.setItem("tms_user", JSON.stringify(data.data.data.user));
//       // localStorage.setItem("tms_token", data.data.data.token);
//       // toast.success(data.data.message);
//     },
//     onError: (error) => {
//       toast.error(error.response.data.message);
//     },
//   });
// };

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
      await Axios.get("/logout");
    },
    onSuccess() {
      localStorage.removeItem("tms_token");
      localStorage.removeItem("tms_user");
      queryClient.clear();
      setUser(null);
      setToken(null);
      navigate("/login");
      // toast.success("Logged out successfully");
    },
  });
};

//* [change password]
// export const useChangePassword = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: "change-password",
//     mutationFn: async (data) => {
//       return await Axios.post("/password/reset", data).then((response) => {
//         return response;
//       });
//     },
//     onSuccess: () => {
//       toast.success("Password Change successfully");
//     },

//     onError: (error) => {
//       toast.error(error.response.data.message);
//     },
//   });
// };

//* [verify email]
// export const useVerifyEmail = () => {
//   const navigate = useNavigate();
//   return useMutation({
//     mutationKey: "verify-email",
//     mutationFn: async (data) => {
//       return await Axios.post("/verify-email", data).then((response) => {
//         return response;
//       });
//     },
//     onSuccess: (data) => {
//       console.log("🟥 ~ useVerifyEmail ~ data:", data);
//       // toast.success("Email verified successfully");
//       navigate("/login");
//     },

//     onError: (error) => {
//       toast.error(error.response.data.message);
//     },
//   });
// };
//* [send-verification-email]
// export const useSendVerificationEmail = (params) => {
//   return useQuery({
//     queryKey: ["send-verification-email"],
//     enabled: false,
//     retry: false,
//     keepPreviousData: false,

//     queryFn: async () => {
//       await Axios.get("/send-verification-email", { params });
//     },
//     onSuccess() {
//       // toast.success("Verify  email send. Please check your email address.");
//     },
//     onError: (error) => {
//       toast.error(error.response.data.message);
//     },
//   });
// };

//* [forget-password]
// export const useForgotPassword = () => {
//   const navigate = useNavigate();
//   return useMutation({
//     mutationKey: "forgot-password",
//     mutationFn: async (data) => {
//       return await Axios.post(`/password/forgot`, data);
//     },
//     onSuccess() {
//       toast.success("Email send successfully");
//       navigate("/login");
//     },
//     onError: (error) => {
//       toast.error(error.response.data.message);
//     },
//   });
// };
