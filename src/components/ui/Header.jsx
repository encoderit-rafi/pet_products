import ToggleLogo from "./ToggleLogo";
import ButtonToggleTheme from "../buttons/ButtonToggleTheme";
import NotificationButton from "../buttons/NotificationButton";
import ProfileCard from "../cards/ProfileCard";
import ButtonWithIcon from "../buttons/ButtonWithIcon";
import BellIcon from "@/assets/icons/BellIcon";
import IconButton from "../buttons/IconButton";
import MenuIcon from "@/assets/icons/MenuIcon";
import Sidebar from "../navigators/Sidebar";
import { useState } from "react";
import Drawer from "../navigators/Drawer";
import ButtonLogout from "../buttons/ButtonLogout";
import Dialog from "../dialogs/Dialog";
import BaseButton from "../buttons/BaseButton";
import { NavLink } from "react-router-dom";
import DialogLogout from "../dialogs/DialogLogout";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog] =
    useState(false);
  return (
    <header className="flex items-center justify-between pl-3 text-white md:pl-5">
      <ToggleLogo />
      <div className="flex items-center gap-3 lg:gap-5">
        <div className="hidden lg:block">
          <ButtonToggleTheme />
        </div>
        <NotificationButton />
        <div className="hidden lg:block">
          <ProfileCard />
        </div>
        <div className=" lg:hidden">
          <IconButton
            className="text-custom_text_two border-custom_line_three size-12 rounded-xl"
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon className="size-5" />
          </IconButton>
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        onClickOutside={() => setIsOpen(false)}
        className="w-36"
      >
        <Sidebar>
          <ButtonLogout onClick={() => setIsOpenConfirmLogoutDialog(true)} />
        </Sidebar>
      </Drawer>
      <DialogLogout
        isOpenConfirmLogoutDialog={isOpenConfirmLogoutDialog}
        setIsOpenConfirmLogoutDialog={setIsOpenConfirmLogoutDialog}
      />
    </header>
  );
}
