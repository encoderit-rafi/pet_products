import { NavLink, Outlet } from "react-router-dom";
import FullLogo from "@/assets/icons/FullLogo";
import BellIcon from "@/assets/icons/BellIcon";
import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";
import BoxIcon from "@/assets/icons/BoxIcon";
const routes = [
  // { path: "/connect", name: "connect", icon: <BoxIcon /> },
  // { path: "/hub", name: "hub", icon: <BoxIcon /> },
  { path: "/products", name: "products", icon: <BoxIcon /> },
  // { path: "/marketing", name: "marketing", icon: <BoxIcon /> },
  // { path: "/shelves", name: "shelves", icon: <BoxIcon /> },
  // { path: "/faqs", name: "faqs", icon: <BoxIcon /> },
  // { path: "/roles", name: "roles", icon: <BoxIcon /> },
  // { path: "/terms", name: "terms", icon: <BoxIcon /> },
];
export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div
      className={`${
        darkMode ? "dark" : "light"
      } flex flex-col px-4 py-3 space-y-3 overflow-hidden text-white bg-custom_bg_one h-svh`}
    >
      <header className="flex items-center justify-between text-white">
        <FullLogo className="w-40" />
        <div className="flex items-center gap-2">
          <ToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="relative p-3 size-14 bg-custom_bg_two rounded-xl">
            <BellIcon className="size-full" />
            <div className="absolute top-0 right-0 flex items-center justify-center text-white translate-x-2 -translate-y-2 border-4 rounded-full border-custom_bg_one bg-lime-500 size-8">
              3
            </div>
          </div>
          <div className="flex gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
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
      <div className="flex flex-1 gap-4">
        <aside className="flex flex-col justify-between flex-1 max-w-24">
          <nav>
            <ul className="">
              {routes.map((route) => (
                <li
                  key={route.name}
                  className="py-4 transition-all duration-700 rounded-xl hover:bg-custom_bg_two"
                >
                  <NavLink
                    to={route.path}
                    className="flex flex-col items-center gap-1 text-center capitalize"
                  >
                    <div className="size-7">{route.icon}</div>
                    <p>{route.name}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button className="text-red-500 transition-all duration-500 hover:text-red-600">
            <div className="flex flex-col items-center gap-2 text-center capitalize">
              <div className="size-7">
                <BoxIcon />
              </div>
              <p>log out</p>
            </div>
          </button>
        </aside>
        <main className="flex-1 bg-custom_bg_two rounded-xl !py-4 px-8 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
