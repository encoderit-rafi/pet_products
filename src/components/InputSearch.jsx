import SearchIcon from "@/assets/icons/SearchIcon";
import React from "react";

export default function InputSearch({ placeholder = "search" }) {
  return (
    <div className="relative text-xs font-extralight text-custom_text_two">
      <input
        type="email"
        name=""
        id=""
        placeholder={placeholder}
        className="w-full py-2 pl-5 bg-transparent border-b placeholder:capitalize focus:bg-transparent border-b-custom_line_two focus:outline-none"
      />
      <div className="absolute -translate-y-1/2 top-1/2 size-4">
        <SearchIcon className="size-full" />
      </div>
    </div>
  );
}
