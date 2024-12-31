import SearchIcon from "@/assets/icons/SearchIcon";
import React from "react";
import InputWithIcon from "./InputWithIcon";
import cn from "@/lib/utils/cn";

export default function InputSearch({ className, placeholder = "search" }) {
  return (
    <InputWithIcon
      id=""
      type="text"
      placeholder={placeholder}
      className={cn(
        "py-2 lg:py-3 pl-5 lg:pl-6 pr-1 text-xs font-extralight placeholder:text-custom_text_eight placeholder:text-left border-b-custom_line_five",
        className
      )}
      icon={
        <div className="absolute -translate-y-1/2 top-1/2 size-3 lg:size-4">
          <SearchIcon className="size-full" />
        </div>
      }
    />
  );
}
