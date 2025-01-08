import cn from "@/lib/utils/cn";
import React from "react";

export default function InputBox({ className, children }) {
  return <div className={cn("space-y-1", className)}>{children}</div>;
}
