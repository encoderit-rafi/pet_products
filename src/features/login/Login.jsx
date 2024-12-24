import React from "react";
import FullLogo from "../../assets/icons/logo/FullLogo";
import MailIcon from "../../assets/icons/MailIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import ButtonGradient from "@/components/buttons/ButtonGradient";
import { useTheme } from "@/context/ThemeProvider";
import FullLogoLight from "@/assets/icons/logo/FullLogoLight";
import ToggleLogo from "@/components/ui/ToggleLogo";
import InputWithIcon from "@/components/inputs/InputWithIcon";
import BrandHeading from "@/components/ui/BrandHeading";

export default function Login() {
  return (
    <div className=" relative px-2 py-20 h-full bg-[url('/background-image.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-custom_bg_twelve before:bg-opacity-[89%] before:content-[''] flex justify-center text-slate-100">
      <div className="z-10 flex flex-col items-center justify-center w-full h-full max-w-[362px]">
        <div className="animate-fade-down">
          <ToggleLogo />
        </div>
        <BrandHeading />
        <div className="w-full space-y-2 text-sm font-light font-poppins animate-fade">
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

        <ButtonGradient className={`mt-24 animate-fade-up`}>
          login
        </ButtonGradient>
      </div>
    </div>
  );
}
