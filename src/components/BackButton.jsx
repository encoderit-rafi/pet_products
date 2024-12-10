import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import React from "react";

export default function BackButton() {
  return (
    <button className="flex items-center justify-center p-1 text-sm bg-gray-300 text-custom_bg_two rounded-xl size-full">
      <ArrowLeftIcon />
    </button>
  );
}
