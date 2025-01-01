import PlusIcon from "@/assets/icons/PlusIcon";
import React from "react";

export default function ButtonWithIcon({
  icon = <PlusIcon />,
  text = "add new",
  ...props
}) {
  return (
    <button
      className="flex items-center gap-1 justify-center py-3  px-4 text-xs whitespace-nowrap !text-white capitalize bg-custom_orange text-custom_bg_two rounded-md lg:rounded-xl size-full "
      {...props}
    >
      <span className="size-3">{icon}</span>
      <span className="hidden font-medium lg:block">{text}</span>
    </button>
  );
}
