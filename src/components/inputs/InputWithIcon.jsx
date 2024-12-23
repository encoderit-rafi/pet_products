import MailIcon from "@/assets/icons/MailIcon";
import cn from "@/lib/utils/cn";
import React from "react";

export default function InputWithIcon({
  id,
  type,
  palceholder,
  icon,
  className,
  ...props
}) {
  return (
    <div className="relative text-custom_text_two">
      <input
        id={id}
        name={id}
        type={type}
        placeholder={palceholder}
        className={cn(
          "w-full py-5 bg-transparent border-b px-14 peer placeholder:text-center placeholder:capitalize focus:bg-transparent focus:border-b-custom_text_two border-b-custom_line_one focus:outline-none",
          className
        )}
        {...props}
      />
      <div className="absolute -translate-y-1/2 top-1/2 size-6 ">
        {/* <MailIcon className="size-full" /> */}
        {icon}
      </div>
    </div>
  );
}
