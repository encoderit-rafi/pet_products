import PlusIcon from "@/assets/icons/PlusIcon";
import React from "react";

export default function ButtonWithIcon({ icon, text }) {
  return (
    <button className="flex items-center gap-1 justify-center py-3  px-4 text-xs whitespace-nowrap !text-white capitalize bg-orange-600 text-custom_bg_two rounded-xl size-full ">
      <span className="size-3">
        <PlusIcon />
      </span>
      <span className="font-medium">add new</span>
    </button>
  );
}
