import { NavLink, Outlet } from "react-router-dom";
import FullLogo from "../assets/icons/FullLogo";
import BellIcon from "../assets/icons/BellIcon";
import ToggleButton from "../components/ToggleButton";
export default function AppLayout() {
  return (
    <div className="bg-[#21272B] h-svh overflow-hidden flex flex-col py-3 px-4 text-white space-y-3">
      <header className="flex items-center justify-between text-white">
        <FullLogo className="w-40" />
        <div className="flex items-center gap-2">
          <ToggleButton />
          <div className="size-14 bg-[#313639] rounded-xl p-3 relative">
            <BellIcon className="size-full" />
            <div className="absolute top-0 right-0 -translate-y-2 text-white translate-x-2 border-4 border-[#21272B] rounded-full bg-lime-500 size-8 flex items-center justify-center">
              3
            </div>
          </div>
          <div className="flex gap-2">
            <div className="size-14 bg-[#313639] rounded-2xl p-1">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-2xl"
              />
            </div>
            <div className="flex flex-col justify-center capitalize">
              <p className="text-sm font-medium">m. khalid saied</p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="flex flex-col justify-between flex-1 py-4 max-w-24">
          <nav>
            <NavLink to="/">Home Nav</NavLink>
          </nav>
          <div className="mt-auto">log out</div>
        </aside>
        <main className="flex-1 bg-[#313639] rounded-xl !p-4 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
