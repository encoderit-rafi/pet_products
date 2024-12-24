import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
//* components📦
import ButtonToggleTheme from "@/components/buttons/ButtonToggleTheme";
import ProfileCard from "@/components/cards/ProfileCard";
import NotificationButton from "@/components/buttons/NotificationButton";
import Dialog from "@/components/popups/Dialog";

//* icons😎
import FullLogo from "@/assets/icons/logo/FullLogo";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import FullLogoLight from "@/assets/icons/logo/FullLogoLight";
import Sidebar from "@/components/navigators/Sidebar";
import BaseButton from "@/components/buttons/BaseButton";
import { useTheme } from "@/context/ThemeProvider";
import ToggleLogo from "@/components/ui/ToggleLogo";
import Header from "@/components/ui/Header";

export default function AppLayout() {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme == "dark" ? "dark" : "light"
      } font-poppins flex flex-col pt-5 pr-5 pb-9 space-y-6 overflow-hidden text-white bg-custom_bg_one h-svh`}
    >
      <Header />
      <div className="flex flex-1 gap-3 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-custom_bg_two rounded-xl !pt-7 !p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
