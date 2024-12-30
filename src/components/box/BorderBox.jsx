import cn from "@/lib/utils/cn";
import React from "react";

export default function BorderBox({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "py-2 lg:py-4  px-3 lg:px-7  border !border-custom_line_two rounded-xl h-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
