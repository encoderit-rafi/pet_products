import React from "react";
import FullLogo from "../../assets/icons/logo/FullLogo";
import MailIcon from "../../assets/icons/MailIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import ButtonGradient from "@/components/ButtonGradient";

export default function Login() {
  return (
    <div className=" relative px-2 py-20 h-full bg-[url('/background-image.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-[#0D192C] before:bg-opacity-[89%] before:content-[''] flex justify-center text-slate-100">
      <div className="z-10 flex flex-col items-center justify-around w-full h-full max-w-[362px]">
        <FullLogo className="max-w-[162.5px]" />
        <div className="space-y-5 text-center">
          <h5 className="text-sm font-light tracking-widest uppercase text-custom_text_one">
            brand manager
          </h5>
          <h1 className="text-4xl font-medium capitalize text-custom_text_two">
            Manage Your <br />
            Brand Analytics & Reports!
          </h1>
        </div>
        <div className="w-full space-y-4">
          <div className="relative ">
            <input
              autoFocus
              type="email"
              name=""
              id=""
              placeholder="Email Address"
              className="w-full py-5 bg-transparent border-b px-14 text-custom_text_two peer placeholder:text-custom_text_two placeholder:text-center focus:bg-transparent focus:border-b-custom_text_two border-b-custom_line_one focus:outline-none"
            />
            <div className="absolute -translate-y-1/2 top-1/2 size-6 peer-focus:text-custom_text_two">
              <MailIcon className="size-full" />
            </div>
          </div>
          <div className="relative ">
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              className="w-full py-5 bg-transparent border-b px-14 text-custom_text_two peer placeholder:text-custom_text_two placeholder:text-center focus:bg-transparent focus:border-b-custom_text_two border-b-custom_line_one focus:outline-none"
            />
            <div className="absolute -translate-y-1/2 top-1/2 size-6 peer-focus:text-custom_text_two">
              <PasswordIcon className="size-full" />
            </div>
            <div className="absolute right-0 -translate-y-1/2 text-custom_text_two top-1/2">
              <span>Forgot</span>
            </div>
          </div>
        </div>

        <ButtonGradient>login</ButtonGradient>
      </div>
    </div>
  );
}
