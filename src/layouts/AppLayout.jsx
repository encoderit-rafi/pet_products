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

export default function AppLayout() {
  const { theme } = useTheme()
  // const [darkMode, setDarkMode] = useState(true);
  const [isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog] =
    useState(false);
  return (
    <div
      className={`${theme == 'dark' ? "dark" : "light"
        } font-poppins flex flex-col pt-5 pr-5 pb-9 space-y-6 overflow-hidden text-white bg-custom_bg_one h-svh`}
    >
      <header className="flex items-center justify-between pl-5 text-white">
        {theme == 'dark' ? (
          <FullLogo className="h-[38px] w-[168px]" />
        ) : (
          <FullLogoLight className="h-[38px] w-[168px]" />
        )}
        <div className="flex items-center gap-4">
          <ButtonToggleTheme />
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
        className="max-w-80"
      >
        <div className="mt-5">
          <h5 className="text-center font-extralight">
            {" "}
            Are you sure you want to logout from your account?
          </h5>
          <div className="flex items-center gap-4 mt-4">
            <BaseButton onClick={() => setIsOpenConfirmLogoutDialog(false)}>
              close
            </BaseButton>
            <BaseButton varient="gradient">
              <NavLink to="/login">confirm</NavLink>
            </BaseButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
