import cn from "@/lib/utils/cn";
import React from "react";

export default function Label({
  id,
  label,
  palceholder,
  className,
  required = false,
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "text-sm font-normal leading-none capitalize whitespace-nowrap text-custom_text_twelve",
        className
      )}
      aria-label={palceholder}
    >
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}
