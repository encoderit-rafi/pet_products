import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import cn from "@/lib/utils/cn";
import ConnectIcon from "@/assets/icons/ConnectIcon";
import { useTheme } from "@/context/ThemeProvider";
import BaseButton from "./BaseButton";
import Dialog from "../dialogs/Dialog";
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
export default function ButtonContact({ setIsOpenDrawerApplicationSupport }) {
  const { isDark } = useTheme();
  // const [isOpenContact, setIsOpenContact] = useState(false);

  const handleMenuItemClick = () => {
    setIsOpenDrawerApplicationSupport(true);
  };

  return (
    <>
      <div className="relative">
        <Menu>
          <MenuButton className={cn("btn-contact ")}>
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
            {data?.map((item) => (
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
    </>
  );
}
