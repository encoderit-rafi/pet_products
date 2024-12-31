import cn from "@/lib/utils/cn";
import React from "react";

export default function SubTitle({ className, children }) {
  return (
    <h3
      className={cn(
        "text-xs lg:text-sm font-normal capitalize text-custom_text_two",
        className
      )}
    >
      {children}
    </h3>
  );
}
