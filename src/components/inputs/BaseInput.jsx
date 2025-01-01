import React from "react";
import Label from "../texts/Label";
import cn from "@/lib/utils/cn";

export default function BaseInput({
  id,
  label,
  className,
  palceholder,
  type = "text",
  hideLabel = false,
}) {
  return (
    <div className="flex flex-col w-full space-y-2">
      {!hideLabel && <Label id={id} palceholder={palceholder} label={label} />}
      <input
        id={id}
        name={id}
        type={type}
        placeholder={palceholder}
        aria-required="true"
        className={cn("base-input ", className)}
      />
    </div>
  );
}
