import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import React from "react";

export default function BackButton() {
  return (
    <button className="flex items-center justify-center p-1 text-sm bg-gray-300 rounded-lg text-custom_bg_two size-full">
      <ArrowLeftIcon className="w-3" />
    </button>
  );
}
