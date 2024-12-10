import SearchIcon from "@/assets/icons/SearchIcon";
import React from "react";

export default function InputSearch({ placeholder = "search" }) {
  return (
    <div className="relative ">
      <input
        type="email"
        name=""
        id=""
        placeholder={placeholder}
        className="w-full py-3 pl-10 text-white bg-transparent border-b-2 placeholder:capitalize peer focus:bg-transparent focus:border-b-white border-b-gray-400 focus:outline-none"
      />
      <div className="absolute text-gray-400 -translate-y-1/2 top-1/2 size-6 peer-focus:text-white">
        <SearchIcon className="size-full" />
      </div>
    </div>
  );
}
