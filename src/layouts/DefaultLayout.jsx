import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "@/context/ThemeProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const { theme } = useTheme();
  const { user } = useAuth();
  if (user) return <Navigate replace to="/" />;
  return (
    <main
      className={`${theme} overflow-hidden bg-green-100 dark font-poppins h-svh`}
    >
      <Outlet />
    </main>
  );
}
