import cn from "@/lib/utils/cn";
import React from "react";

export default function Drawer({ isOpen, children, className }) {
  return (
    <div
      className={`fixed inset-0  z-50 flex flex-row-reverse transition-all duration-200 ${
        isOpen ? "visible bg-black/10 backdrop-blur-sm" : "invisible"
      }`}
    >
      <div
        className={cn(
          "w-full h-full shadow-sm transition-all  duration-300 bg-custom_bg_nine  py-16 px-10",
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
