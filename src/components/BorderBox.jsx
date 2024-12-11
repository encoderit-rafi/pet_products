import cn from "@/lib/utils/cn";
import React from "react";

export default function BorderBox({ children, className }) {
  return (
    <div
      className={cn(
        "py-4 border !border-custom_line_two rounded-xl px-7",
        className
      )}
    >
      {children}
    </div>
  );
}
