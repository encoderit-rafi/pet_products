import EditIcon from "@/assets/icons/EditIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "@/context/ThemeProvider";
import cn from "@/lib/utils/cn";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useState } from "react";
import DrawerViewUser from "../drawers/DrawerViewUser";
import DrawerUpdateUser from "../drawers/DrawerUpdateUser";
import DialogLogout from "../dialogs/DialogLogout";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import ProfileEditIcon from "@/assets/icons/ProfileEditIcon";

export default function ProfileCard({ ...props }) {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [isBackdrop, setIsBackdrop] = useState(true);
  const [isOpenViewUser, setIsOpenViewUser] = useState(false);
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
  const [isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog] =
    useState(false);
  const options = [
    {
      icon: <ProfileIcon className="size-5" />,
      text: "my profile",
      action: () => setIsOpenViewUser(true),
    },
    {
      icon: <ProfileEditIcon className="size-5" />,
      text: "customize profile",
      action: () => {
        setIsBackdrop(true);
        setIsOpenUpdateUser(true);
      },
    },
  ];
  console.log({ user });
  return (
    <>
      <Menu>
        <MenuButton>
          <div className="flex items-center gap-1 cursor-pointer lg:gap-2">
            <div className="p-1 size-12 bg-custom_bg_five rounded-[13px] shadow-sm">
              <img
                src={user?.image?.url || "/placeholder-image.webp"}
                alt={user?.name}
                onError={(e) => (e.target.src = "/placeholder-image.webp")}
                className="object-cover object-center h-full rounded-xl"
              />
            </div>
            <div className="flex-col hidden lg:flex">
              <p className="text-sm font-normal text-left capitalize text-custom_text_four">
                {user.name}
              </p>
              <p className="text-xs text-left text-custom_text_five font-extralight">
                {user.email}
              </p>
            </div>
          </div>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className={cn(
            "w-56 z-[60]  mt-4 space-y-3 rounded-xl p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-200 ease-in data-[leave]:data-[closed]:opacity-0 shadow-lg",
            {
              "bg-[#181c1f]": isDark,
              "bg-[#f0f0f0]": !isDark,
            }
          )}
        >
          {options?.map((data) => (
            <MenuItem key={data.text}>
              <button
                className={cn(
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
          ))}
        </MenuItems>
      </Menu>

      {/* View User */}
      <DrawerViewUser
        isOpen={isOpenViewUser}
        setIsOpen={() => {
          setIsOpenViewUser(false);
        }}
        onClickEdit={() => {
          setIsBackdrop(false);
          setIsOpenUpdateUser(true);
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
