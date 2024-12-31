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
          "w-full py-5 lg:py-8 bg-transparent border-b px-12 peer placeholder:text-center placeholder:text-custom_text_two placeholder:capitalize focus:bg-transparent focus:border-b-custom_text_two border-b-custom_line_one focus:outline-none",
          className
        )}
        {...props}
      />
      {icon}
    </div>
  );
}
