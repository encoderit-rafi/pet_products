import EditIcon from "@/assets/icons/EditIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import RolesIcon from "@/assets/icons/RolesIcon";
import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "@/context/ThemeProvider";
import cn from "@/lib/utils/cn";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useState } from "react";
import DrawerViewUser from "../drawers/DrawerViewUser";
import DrawerUpdateUser from "../drawers/DrawerUpdateUser";
import DialogLogout from "../dialogs/DialogLogout";

export default function ProfileCard({ ...props }) {
  const { user } = useAuth()
  const { isDark } = useTheme();
  const [isBackdrop, setIsBackdrop] =
    useState(true);
  const [isOpenViewUser, setIsOpenViewUser] =
    useState(false);
  const [isOpenUpdateUser, setIsOpenUpdateUser] =
    useState(false);
  const [isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog] =
    useState(false);
  const options = [
    {
      icon: <RolesIcon className="size-3" />,
      text: "my profile",
      action: () => setIsOpenViewUser(true)
    },
    {
      icon: <EditIcon className="size-3" />,
      text: "customize profile",
      action: () => {
        setIsBackdrop(true)
        setIsOpenUpdateUser(true)
      }

    },
    {
      icon: <LogoutIcon className="size-3 text-red-500" />,
      text: <span className="text-red-500">log out</span>,
      action: () =>
        setIsOpenConfirmLogoutDialog(true)
    },
  ]
  console.log({ user })
  return (
    <>
      <Menu>
        <MenuButton >
          <div className="flex gap-1 lg:gap-4 cursor-pointer"
          // {...props}
          >
            <div className="p-1 size-12 bg-custom_bg_five rounded-[13px] shadow-sm">
              <img
                src={user?.image?.url}
                alt={user?.name}
                onError={(e) =>
                  (e.target.src = "/placeholder-image.webp")
                }
                className="rounded-xl object-cover object-center"
              />
            </div>
            <div className="lg:flex hidden flex-col justify-center capitalize">
              <p className="text-sm font-normal text-custom_text_four">
                {user.name}
              </p>
              <p className="text-xs text-custom_text_five font-extralight">
                {user.email}
              </p>
            </div>
          </div>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className={cn(
            "w-56 z-[60] mt-1 space-y-3 rounded-xl p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-200 ease-in data-[leave]:data-[closed]:opacity-0 shadow-lg",
            {
              "bg-[#21272b]": isDark,
              "bg-[#f8f8f8]": !isDark,
            }
          )}
        >
          {
            options.map(data =>

              <MenuItem
                key={data.text}
              >
                <button className={cn(
                  "group text-xs cursor-pointer transition-all duration-300  capitalize  w-full flex items-center gap-4 rounded-lg py-1.5 px-3 hover:px-4",
                  {
                    "text-white": isDark,
                    "text-black": !isDark,
                    "hover:bg-[#313639]": isDark,
                    "hover:bg-[#ffffff]": !isDark,

                  }
                )}
                  onClick={data.action}
                >
                  {data.icon}
                  {data.text}
                </button>
              </MenuItem>
            )
          }

        </MenuItems>
      </Menu>

      {/* View User */}
      <DrawerViewUser
        isOpen={isOpenViewUser}
        setIsOpen={() => {
          setIsOpenViewUser(false)
        }}
        onClickEdit={() => {
          setIsBackdrop(false)
          setIsOpenUpdateUser(true)
        }}
      />
      {/* Update User */}
      <DrawerUpdateUser
        isOpen={isOpenUpdateUser}
        setIsOpen={() => setIsOpenUpdateUser(false)}
        backDrop={isBackdrop}
      />
      {/* Log Out */}
      <DialogLogout
        isOpenConfirmLogoutDialog={isOpenConfirmLogoutDialog}
        setIsOpenConfirmLogoutDialog={setIsOpenConfirmLogoutDialog}
      />
    </>
  );
}
