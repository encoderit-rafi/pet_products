import { NavLink, Outlet } from "react-router-dom";
import FullLogo from "@/assets/icons/FullLogo";
import BellIcon from "@/assets/icons/BellIcon";
import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";
import BoxIcon from "@/assets/icons/BoxIcon";
import ProductsIcon from "@/assets/icons/ProductsIcon";
import MarketingIcon from "@/assets/icons/MarketingIcon";
import FaqsIcon from "@/assets/icons/FaqsIcon";
import RolesIcon from "@/assets/icons/RolesIcon";
import TermsIcon from "@/assets/icons/TermsIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import ShelvesIcon from "@/assets/icons/ShelvesIcon";
import HubIcon from "@/assets/icons/HubIcon";
import FullLogoLight from "@/assets/icons/FullLogoLight";
import NotificationButton from "@/components/NotificationButton";
import ProfileCard from "@/components/ProfileCard";
import ConnectIcon from "@/assets/icons/ConnectIcon";
const routes = [
  { path: "/hub", name: "hub", icon: <HubIcon className="w-5" /> },
  {
    path: "/products",
    name: "products",
    icon: <ProductsIcon className="w-4" />,
  },
  {
    path: "/marketing",
    name: "marketing",
    icon: <MarketingIcon className="w-5" />,
  },
  { path: "/shelves", name: "shelves", icon: <ShelvesIcon className="w-4" /> },
  { path: "/faqs", name: "FAQs", icon: <FaqsIcon className="w-2" /> },
  { path: "/roles", name: "roles", icon: <RolesIcon className="w-4" /> },
  { path: "/terms", name: "terms", icon: <TermsIcon className="w-4" /> },
];
export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div
      className={`${
        darkMode ? "dark" : "light"
      } font-poppins flex flex-col pt-5 pr-5 pb-9 gap-6 overflow-hidden text-white bg-custom_bg_one h-svh`}
    >
      <header className="flex items-center justify-between pl-5 text-white">
        {darkMode ? (
          <FullLogo className="h-[38px]" />
        ) : (
          <FullLogoLight className="h-[38px]" />
        )}
        <div className="flex items-center gap-4">
          <ToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
          <NotificationButton />
          <ProfileCard />
        </div>
      </header>
      <div className="flex flex-1 gap-3">
        <aside className="flex flex-col justify-between flex-1 max-w-24">
          <nav>
            <ul className="space-y-6">
              <li className="">
                <NavLink
                  to="/"
                  className="flex flex-col items-center gap-2 text-xs text-center capitalize text-custom_text_six before:absolute before:content('') before:w-[2px] before:bg-custom_orange before:top-0 before:left-0 before:bottom-0 before:h-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300"
                >
                  <ConnectIcon className="w-10" />
                  <span className="font-[100]">connect</span>
                </NavLink>
              </li>
              {routes.map((route) => (
                <li key={route.name} className="relative group">
                  <NavLink
                    to={route.path}
                    className="flex flex-col items-center gap-2 text-xs text-center capitalize text-custom_text_six before:absolute before:content('') before:w-[2px] before:bg-custom_orange before:top-0 before:left-0 before:bottom-0 before:h-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300"
                  >
                    {route.icon}
                    <span className="font-[100]">{route.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <NavLink
            to="/login"
            className="text-xs font-light transition-all duration-500 text-custom_text_six hover:text-red-600"
          >
            <div className="flex flex-col items-center gap-2 text-center capitalize">
              <LogoutIcon className="w-4" />

              <p>log out</p>
            </div>
          </NavLink>
        </aside>
        <main className="flex-1 bg-custom_bg_two rounded-xl !pt-7 !p-8 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
