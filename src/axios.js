import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "./consts";

const Axios = axios.create({
  baseURL: `${BASE_URL}/api`,
});
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      toast.error("Unauthorized");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
export { Axios };
