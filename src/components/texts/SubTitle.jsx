import cn from "@/lib/utils/cn";
import React from "react";

export default function SubTitle({ className, children }) {
  return (
    <h3
      className={cn(
        "text-sm font-light capitalize text-custom_text_two",
        className
      )}
    >
      {children}
    </h3>
  );
}
