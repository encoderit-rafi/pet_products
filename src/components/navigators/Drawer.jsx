import cn from "@/lib/utils/cn";
import React from "react";
import Logout from "../buttons/ButtonLogout";

export default function Drawer({
  isOpen,
  children,
  className,
  onClickOutside,
  backDrop = true,
}) {
  return (
    <div
      className={`fixed inset-0  z-50 flex flex-row-reverse transition-all duration-200 ${
        isOpen ? "visible " : "invisible"
      } ${backDrop ? "bg-black/10 backdrop-blur-sm" : " "}`}
      onClick={onClickOutside}
    >
      <div
        className={cn(
          "w-full h-full  shadow-sm transition-all  duration-300 bg-custom_bg_nine  py-8 lg:py-16 px-5 lg:px-10",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
