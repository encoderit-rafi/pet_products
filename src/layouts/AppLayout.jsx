import { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { Outlet } from "react-router-dom";
//* components📦

//* icons😎
import Sidebar from "@/components/navigators/Sidebar";
import Header from "@/components/ui/Header";
import ButtonLogout from "@/components/buttons/ButtonLogout";
import DialogLogout from "@/components/dialogs/DialogLogout";

export default function AppLayout() {
  const { theme } = useTheme();
  const [isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog] =
    useState(false);
  return (
    <div
      className={`${theme == "dark" ? "dark" : "light"
        } font-poppins flex flex-col pt-3 lg:pt-5 pr-3 lg:pr-5 pb-3 lg:pb-5 space-y-6 overflow-hidden text-white bg-custom_bg_one h-svh`}
    >
      <Header />
      <div className="flex flex-1 gap-3 overflow-hidden">

        <Sidebar className="hidden lg:flex max-w-24">
          <ButtonLogout
            onClick={() => setIsOpenConfirmLogoutDialog(true)}

          />
        </Sidebar>

        <main className="flex-1 bg-custom_bg_two rounded-xl  !pt-3 lg:!pt-7 ml-3 lg:ml-0 !p-3 lg:!p-8 overflow-hidden">
          <div className="h-full overflow-auto">

            <Outlet />
          </div>
        </main>
      </div>
      <DialogLogout isOpenConfirmLogoutDialog={isOpenConfirmLogoutDialog} setIsOpenConfirmLogoutDialog={setIsOpenConfirmLogoutDialog} />
    </div>
  );
}
