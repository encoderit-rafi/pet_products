import { useState } from "react";
import { Outlet } from "react-router-dom";
//* components📦
import ToggleButton from "@/components/ToggleButton";
import ProfileCard from "@/components/ProfileCard";
import NotificationButton from "@/components/NotificationButton";
import Dialog from "@/components/Dialog";

//* icons😎
import FullLogo from "@/assets/icons/FullLogo";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import FullLogoLight from "@/assets/icons/FullLogoLight";
import Sidebar from "@/components/Sidebar";


export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(true);
  const [isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog] =
    useState(false);
  return (
    <div
      className={`${darkMode ? "dark" : "light"
        } font-poppins flex flex-col pt-5 pr-5 pb-9 space-y-6 overflow-hidden text-white bg-custom_bg_one h-svh`}
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
      <div className="flex flex-1 gap-3 overflow-hidden">
        <aside className="flex flex-col justify-between flex-1 max-w-24 ">
          <Sidebar />
          <button
            onClick={() => setIsOpenConfirmLogoutDialog(true)}
            className="text-xs font-light transition-all duration-500 text-custom_text_six hover:text-red-600"
          >
            <div className="flex flex-col items-center gap-2 text-center capitalize">
              <LogoutIcon className="w-4" />

              <p>log out</p>
            </div>
          </button>
        </aside>

        <main className="flex-1 bg-custom_bg_two rounded-xl !pt-7 !p-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Dialog
        title="log out"
        isOpen={isOpenConfirmLogoutDialog}
        className="w-[600px] h-[600px]"
      >
        {/* logout */}
        <button
          className="bg-red-500"
          onClick={() => setIsOpenConfirmLogoutDialog(false)}
        >
          close
        </button>
      </Dialog>
    </div>
  );
}
