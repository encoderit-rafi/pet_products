import BellIcon from "@/assets/icons/BellIcon";
import React from "react";

export default function NotificationButton() {
  return (
    <button className="relative flex items-center justify-center border size-12 bg-custom_bg_two rounded-xl border-custom_line_two text-custom_text_two">
      <BellIcon className="size-5" />
      <div className="absolute top-0 right-0 flex items-center justify-center text-xs text-white translate-x-3 -translate-y-3 border-4 rounded-full border-custom_bg_one bg-custom_bg_four size-8">
        3
      </div>
    </button>
  );
}