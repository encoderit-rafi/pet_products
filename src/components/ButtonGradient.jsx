import cn from "@/lib/utils/cn";
import React from "react";

export default function ButtonGradient({ children, className }) {
  return (
    <button
      className={cn(
        "w-full  py-3 font-medium rounded-xl whitespace-nowrap bg-gradient-to-r from-[#00B451]  to-[#74B222] text-lg capitalize",
        className
      )}
    >
      {children}
    </button>
  );
}
