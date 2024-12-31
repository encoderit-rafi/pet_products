import React from "react";
import MailIcon from "../../assets/icons/MailIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";

import ToggleLogo from "@/components/ui/ToggleLogo";
import InputWithIcon from "@/components/inputs/InputWithIcon";
import BrandHeading from "@/components/ui/BrandHeading";
import BaseButton from "@/components/buttons/BaseButton";

export default function Login() {
  return (
    <div className=" relative font-poppins h-svh px-2 py-20 bg-[url('/background-image.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-custom_bg_twelve before:bg-opacity-[89%] before:content-[''] flex justify-center text-slate-100">
      <div className="z-10 flex flex-col items-center justify-center w-full h-full max-w-[362px]">
        <div className="animate-fade-down">
          <ToggleLogo />
        </div>
        <div className="mt-[2.688rem] lg:mt-[4.688rem] mb-10 lg:mb-14 ">
          <BrandHeading />
        </div>
        <div className="w-full px-3 space-y-3 text-sm font-light lg:space-y-2 font-poppins animate-fade lg:px-0">
          <InputWithIcon
            autoFocus
            id="email"
            type="email"
            palceholder="email address"
            icon={
              <MailIcon className="absolute -translate-y-1/2 top-1/2 size-5" />
            }
          />
          <div className="relative ">
            <InputWithIcon
              id="password"
              type="password"
              palceholder="password"
              icon={
                <PasswordIcon className="absolute -translate-y-1/2 top-1/2 size-5" />
              }
            />
            <div className="absolute right-0 -translate-y-1/2 text-custom_text_two top-1/2">
              <span>Forgot</span>
            </div>
          </div>
        </div>
        <div className="w-full px-3 mt-20 lg:px-0 lg:mt-24 animate-fade-up">
          <BaseButton variant="gradient" className="font-medium">
            login
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
