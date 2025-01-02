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
      <Drawer
        isOpen={isOpenDrawerApplicationSupport}
        className="flex flex-col max-w-96"
      >
        <Title>Application Support</Title>
        <div className="flex-1 mt-5 space-y-3 overflow-y-auto">
          <BorderBox
            className="cursor-pointer lg:p-3 h-fit"
            onClick={() => setIsOpenDrawerSingleApplicationSupport(true)}
          >
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="object-cover object-center w-12 h-16 rounded-lg"
              />

              <div className="flex flex-col justify-between flex-1 h-16 capitalize">
                <p className="text-sm font-medium text-custom_text_four">
                  m. khalid saied
                </p>
                <p className="text-xs text-gray-400">role here</p>
                <div className="flex items-center gap-3 text-yellow-500">
                  <LinkedinIcon className="size-4" />
                  <FacebookIcon className="size-4" />
                  <WhatsappIcon className="size-4" />
                  <MessageIcon className="size-4" />
                  <PhoneIcon className="size-4" />
                </div>
              </div>
            </div>
          </BorderBox>
        </div>
        <BaseButton
          onClick={() => setIsOpenDrawerApplicationSupport(false)}
          className="mt-10"
        >
          done
        </BaseButton>
      </Drawer>
      {/* Single Application Support Drawer */}
      <Drawer
        isOpen={isOpenDrawerSingleApplicationSupport}
        className="flex flex-col max-w-96"
      >
        <div className="flex-1 mt-5 space-y-3 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center px-6 py-3 bg-transparent border rounded-full border-custom_line_four siz-10 text-custom_yellow">
              <ImageIcon className="size-5" />
            </div>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover object-center rounded-2xl size-28"
            />
            <div className="flex items-center justify-center px-6 py-3 bg-transparent border rounded-full border-custom_line_four siz-10 text-custom_yellow">
              <CameraIcon className="size-5" />
            </div>
          </div>

          <BaseInput
            id="email"
            type="email"
            label="email"
            palceholder="email"
            className="py-3 rounded-lg"
          />
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="w-[49%]">
              <BaseInput
                id="first name"
                type="first name"
                label="first name"
                palceholder="first name"
                className="py-3 rounded-lg"
              />
            </div>
            <div className="w-[49%]">
              <BaseInput
                id="last name"
                type="last name"
                label="last name"
                palceholder="last name"
                className="py-3 rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label id="phone_number" label="phone number" />
            <InputPhoneNumber />
          </div>
          <div className="space-y-2">
            <Label id="address" label="address" />
            <InputPlace />
          </div>
        </div>
        <div className="flex gap-4 mt-10">
          <BaseButton
            className="text-xs font-light lg:text-sm"
            onClick={() => setIsOpenDrawerSingleApplicationSupport(false)}
          >
            cancel
          </BaseButton>
          <BaseButton
            variant="gradient"
            className="text-xs font-light lg:text-sm"
            onClick={() => setIsOpenDrawerSingleApplicationSupport(false)}
          >
            save change
          </BaseButton>
        </div>
      </Drawer>
    </header>
  );
}
