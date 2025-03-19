import React from "react";
import Label from "../texts/Label";
import cn from "@/lib/utils/cn";
import InputBox from "../box/InputBox";

export default function BaseInput({
  id,
  label,
  className,
  palceholder,
  register,
  type = "text",
  hideLabel = false,
  required,
  ...props
}) {
  return (
    <InputBox className="flex flex-col w-full">
      {!hideLabel && (
        <Label
          id={id}
          palceholder={palceholder}
          label={label}
          required={required}
        />
      )}
      <input
        id={id}
        name={id}
        type={type}
        aria-required="true"
        placeholder={palceholder}
        className={cn("base-input", className)}
        {...props}
        {...register}
      />
    </InputBox>
  );
}
