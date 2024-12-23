import PlusIcon from "@/assets/icons/PlusIcon";
import cn from "@/lib/utils/cn";
import React from "react";

export default function BaseButton({
  children,
  className,
  variant = "base",
  icon,
  ...props
}) {
  return (
    <button
      className={cn(
        "w-full  py-3 font-medium rounded-xl whitespace-nowrap  text-lg capitalize",
        {
          "bg-custom_bg_one text-custom_text_two": variant == "base",
          "bg-custom_orange text-white": variant == "orange",
          "bg-gradient-to-r from-[#00B451]  to-[#74B222] text-white":
            variant == "gradient",
        },
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 justify-center">
        {icon == "plus" && (
          <span className="size-3">
            <PlusIcon />
          </span>
        )}
        {children}
      </div>
    </button>
  );
}
