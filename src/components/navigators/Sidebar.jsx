import React from "react";
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
import Dialog from "../popups/Dialog";
import BaseButton from "../buttons/BaseButton";
import { useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
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
export default function Sidebar() {
  const location = useLocation();
  const { isDark } = useTheme();
  const [isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog] =
    useState(false);
  console.log({ location });
  return (
    <aside className="flex flex-col justify-between flex-1 max-w-24">
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
                  anchor="left"
                  className={cn(
                    " w-full !max-w-80 z-[60] rounded-2xl bg-custom_bg_nine   p-4 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 grid grid-cols-2 gap-3 shadow-lg",
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
      <button
        onClick={() => setIsOpenConfirmLogoutDialog(true)}
        className="text-xs font-light transition-all duration-500 text-custom_text_six hover:text-red-500"
      >
        <div className="flex flex-col items-center gap-2 text-center capitalize">
          <LogoutIcon className="w-4" />

          <p>log out</p>
        </div>
      </button>
      <Dialog
        title="log out"
        isOpen={isOpenConfirmLogoutDialog}
        className="max-w-96"
      >
        <div className="mt-4">
          <h5 className="mx-auto text-sm tracking-wide text-center max-w-72 font-extralight">
            {" "}
            Are you sure you want to logout from your account?
          </h5>
          <div className="flex items-center gap-4 mt-5">
            <BaseButton
              className="text-sm font-medium"
              onClick={() => setIsOpenConfirmLogoutDialog(false)}
            >
              close
            </BaseButton>
            <BaseButton variant="gradient" className="text-sm font-medium">
              <NavLink to="/login">confirm</NavLink>
            </BaseButton>
          </div>
        </div>
      </Dialog>
    </aside>
  );
}
