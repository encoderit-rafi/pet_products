import { useTheme } from "@/context/ThemeProvider";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const { theme } = useTheme();
  console.log("✅ ~ file: DefaultLayout.jsx:6 ~ DefaultLayout ~ theme:", theme);
  return (
    <main
      className={`${theme} overflow-hidden bg-green-100 dark font-poppins h-svh`}
    >
      <Outlet />
    </main>
  );
}
