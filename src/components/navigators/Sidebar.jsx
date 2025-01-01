import React, { Children } from "react";
import { NavLink, useLocation } from "react-router-dom";
//* icons😎
import ProductsIcon from "@/assets/icons/ProductsIcon";
import MarketingIcon from "@/assets/icons/MarketingIcon";
import FaqsIcon from "@/assets/icons/FaqsIcon";
import RolesIcon from "@/assets/icons/RolesIcon";
import TermsIcon from "@/assets/icons/TermsIcon";
import ShelvesIcon from "@/assets/icons/ShelvesIcon";
import HubIcon from "@/assets/icons/HubIcon";
import ConnectIcon from "@/assets/icons/ConnectIcon";
//* data📂
const routes = [
  { path: "/", name: "hub", icon: <HubIcon className="w-4" /> },
  {
    path: "/products",
    name: "products",
    icon: <ProductsIcon className="w-4" />,
  },
  {
    path: "/marketing",
    name: "marketing",
    icon: <MarketingIcon className="w-[18px]" />,
  },
  {
    path: "/shelves",
    name: "shelves",
    icon: <ShelvesIcon className="w-4" />,
  },
  { path: "/faqs", name: "FAQs", icon: <FaqsIcon className="w-2" /> },
  { path: "/roles", name: "roles", icon: <RolesIcon className="w-4" /> },
  {
    path: "/terms",
    name: "terms",
    icon: <TermsIcon className="w-4" />,
  },
];
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import cn from "@/lib/utils/cn";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import Dialog from "../dialogs/Dialog";
import BaseButton from "../buttons/BaseButton";
import { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import Logout from "../buttons/ButtonLogout";
import Drawer from "./Drawer";
import Title from "../texts/Title";
import BorderBox from "../box/BorderBox";
import LinkedinIcon from "@/assets/icons/LinkedinIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import ImageIcon from "@/assets/icons/ImageIcon";
import CameraIcon from "@/assets/icons/CameraIcon";
import InputText from "../inputs/InputText";
import Label from "../texts/Label";
import InputPhoneNumber from "../inputs/InputPhoneNumber";
import InputPlace from "../inputs/InputPlace";
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
export default function Sidebar({ className, children }) {
  const location = useLocation();
  const { isDark } = useTheme();
  const [isOpenDrawerApplicationSupport, setIsOpenDrawerApplicationSupport] =
    useState(false);
  const [
    isOpenDrawerSingleApplicationSupport,
    setIsOpenDrawerSingleApplicationSupport,
  ] = useState(false);
  const handleMenuItemClick = () => {
    setIsOpenDrawerApplicationSupport(true);
  };

  return (
    <aside className={cn("flex flex-col justify-between flex-1", className)}>
      <nav className="pb-6 overflow-y-auto">
        <ul className="space-y-6">
          <li className="">
            <div className="relative">
              <Menu>
                <MenuButton
                  className={cn(
                    "flex flex-col items-center gap-2 text-xs capitalize text-custom_text_six w-full font-light"
                  )}
                >
                  <ConnectIcon className="w-10" />
                  <span className="">connect</span>
                </MenuButton>
                <MenuItems
                  transition
                  anchor="right center"
                  className={cn(
                    "w-full  lg:!max-w-80 z-[60] rounded-2xl bg-custom_bg_nine p-4 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 grid grid-cols-2 gap-3 shadow-lg",
                    {
                      "bg-[#4D4D4D]": isDark,
                      "bg-[#ffffff]": !isDark,
                    }
                  )}
                >
                  {data.map((item) => (
                    <MenuItem key={item.id}>
                      <button
                        className={cn(
                          `group text-center text-xs font-extralight capitalize w-full items-center gap-2 rounded-xl py-3 px-7`,
                          {
                            "bg-[#393939] text-[#ffffff]": isDark,
                            "bg-[#f8f8f8] text-[#000000]": !isDark,
                          }
                        )}
                        onClick={handleMenuItemClick}
                      >
                        {item?.name}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </li>

          {routes.map((route) => (
            <li key={route.name} className="relative group">
              <NavLink
                to={route.path}
                className={cn(
                  `flex flex-col items-center gap-2 text-xs text-center capitalize text-custom_text_six before:absolute before:content('') before:w-[2px] before:bg-custom_orange before:top-0 before:left-0 before:bottom-0 before:h-full before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300 font-light`,
                  {
                    "before:opacity-100 text-custom_text_two font-normal":
                      location.pathname == route.path,
                  }
                )}
              >
                <span className="">{route.icon}</span>
                <span className="">{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {children}
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

          <InputText
            id="email"
            type="email"
            label="email"
            palceholder="email"
            className="py-3 rounded-lg"
          />
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="w-[49%]">
              <InputText
                id="first name"
                type="first name"
                label="first name"
                palceholder="first name"
                className="py-3 rounded-lg"
              />
            </div>
            <div className="w-[49%]">
              <InputText
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
    </aside>
  );
}
