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
import ButtonContact from "../buttons/ButtonContact";
import DrawerApplicationSupport from "../drawers/DrawerApplicationSupport";
import CardApplicationSupport from "../cards/CardApplicationSupport";
import BaseInput from "../inputs/BaseInput";
import DrawerSingleApplicationSupport from "../drawers/DrawerSingleApplicationSupport";

export default function Sidebar({ className, children }) {
  const location = useLocation();
  const [isOpenDrawerApplicationSupport, setIsOpenDrawerApplicationSupport] =
    useState(false);
  const [
    isOpenDrawerSingleApplicationSupport,
    setIsOpenDrawerSingleApplicationSupport,
  ] = useState(false);
  // const [isOpenContact, setIsOpenContact] = useState(false);

  return (
    <aside className={cn("flex flex-col justify-between flex-1", className)}>
      <nav className="pb-6 overflow-y-auto">
        <ul className="space-y-6">
          <div className="hidden lg:block">
            <ButtonContact
              setIsOpenDrawerApplicationSupport={
                setIsOpenDrawerApplicationSupport
              }
            />
          </div>

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
    </aside>
  );
}
