import PlusIcon from "@/assets/icons/PlusIcon";
import React from "react";

export default function ButtonWithIcon({ icon, text }) {
  return (
    <button className="flex items-center gap-1 justify-center p-2 text-base whitespace-nowrap !text-white capitalize bg-orange-600 text-custom_bg_two rounded-xl size-full ">
      <span className="size-6">
        <PlusIcon />
      </span>
      <span className="font-medium">add new</span>
    </button>
  );
}
