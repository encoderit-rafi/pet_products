import SearchIcon from "@/assets/icons/SearchIcon";
import React from "react";
import InputWithIcon from "./InputWithIcon";

export default function InputSearch() {
  return (
    <InputWithIcon
      id=""
      type="text"
      placeholder="search dashboard"
      className="py-3 pl-6 text-xs placeholder:text-custom_text_eight placeholder:text-left border-b-custom_line_five"
      icon={
        <div className="absolute -translate-y-1/2 top-1/2 size-4">
          <SearchIcon className="size-full" />
        </div>
      }
    />
  );
}
