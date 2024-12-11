import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <main className="overflow-hidden bg-green-100 dark font-poppins h-svh">
      <Outlet />
    </main>
  );
}
