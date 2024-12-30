import cn from "@/lib/utils/cn";
import React from "react";

export default function Title({ className, children, ...props }) {
  return (
    <h2
      className={cn(
        "text-sm lg:text-base font-medium capitalize text-custom_text_two",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
