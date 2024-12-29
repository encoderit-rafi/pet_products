import cn from "@/lib/utils/cn";
import React from "react";

export default function BorderBox({ children, className }) {
  return (
    <div
      className={cn(
        "py-2 lg:py-4  px-3 lg:px-7  border !border-custom_line_two rounded-xl h-full",
        className
      )}
    >
      {children}
    </div>
  );
}
