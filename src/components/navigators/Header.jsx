import ToggleLogo from "../ui/ToggleLogo";
import ButtonToggleTheme from "../buttons/ButtonToggleTheme";
import NotificationButton from "../buttons/NotificationButton";
import ProfileCard from "../cards/ProfileCard";

import BellIcon from "@/assets/icons/BellIcon";
import IconButton from "../buttons/IconButton";
import MenuIcon from "@/assets/icons/MenuIcon";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Drawer from "./Drawer";
import ButtonLogout from "../buttons/ButtonLogout";
import Dialog from "../dialogs/Dialog";
import BaseButton from "../buttons/BaseButton";
import { NavLink } from "react-router-dom";
import DialogLogout from "../dialogs/DialogLogout";
import cn from "@/lib/utils/cn";
import ConnectIcon from "@/assets/icons/ConnectIcon";
import Title from "../texts/Title";
import BorderBox from "../box/BorderBox";
import ImageIcon from "@/assets/icons/ImageIcon";
import CameraIcon from "@/assets/icons/CameraIcon";
import BaseInput from "../inputs/BaseInput";
import Label from "../texts/Label";
import InputPlace from "../inputs/InputPlace";
import LinkedinIcon from "@/assets/icons/LinkedinIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import InputPhoneNumber from "../inputs/InputPhoneNumber";
import DrawerApplicationSupport from "../drawers/DrawerApplicationSupport";
import CardApplicationSupport from "../cards/CardApplicationSupport";
import DrawerSingleApplicationSupport from "../drawers/DrawerSingleApplicationSupport";
const data = [
  {
    id: 1,
    name: "Marketing",
    value: "marketing",
  },
  {
    id: 2,
    name: "Sales",
    value: "sales",
  },
  {
    id: 3,
    name: "Finance",
    value: "finance",
  },
  {
    id: 4,
    name: "Supply Chain",
    value: "supply_chain",
  },
  {
    id: 5,
    name: "Support",
    value: "support",
  },
  {
    id: 6,
    name: "Plan a Visit",
    value: "plan_a_visit",
  },
];
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [isOpenDrawerApplicationSupport, setIsOpenDrawerApplicationSupport] =
    useState(false);
  const [
    isOpenDrawerSingleApplicationSupport,
    setIsOpenDrawerSingleApplicationSupport,
  ] = useState(false);
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
        <>
          <button
            className={cn("btn-contact  lg:hidden block")}
            onClick={() => setIsOpenContact(true)}
          >
            <ConnectIcon className="w-10" />
            <span className="">connect</span>
          </button>
          <Sidebar>
            <ButtonLogout onClick={() => setIsOpenConfirmLogoutDialog(true)} />
          </Sidebar>
        </>
      </Drawer>
      <DialogLogout
        isOpenConfirmLogoutDialog={isOpenConfirmLogoutDialog}
        setIsOpenConfirmLogoutDialog={setIsOpenConfirmLogoutDialog}
      />
      <Dialog isOpen={isOpenContact} title="" className="z-[9999]">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {data.map((item) => (
              <BaseButton
                key={item.id}
                onClick={() => setIsOpenDrawerApplicationSupport(true)}
              >
                {item?.name}
              </BaseButton>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenContact(false)}>
              cancel
            </BaseButton>
          </div>
        </div>
      </Dialog>
      {/* Application Support Drawer */}
      <DrawerApplicationSupport
        isOpen={isOpenDrawerApplicationSupport}
        setIsOpen={() => setIsOpenDrawerApplicationSupport(false)}
      >
        <CardApplicationSupport
          onClick={() => setIsOpenDrawerSingleApplicationSupport(true)}
        />
      </DrawerApplicationSupport>

      {/* Single Application Support Drawer */}
      <DrawerSingleApplicationSupport
        isOpen={isOpenDrawerSingleApplicationSupport}
        setIsOpen={() => setIsOpenDrawerSingleApplicationSupport(false)}
      />
    </header>
  );
}
