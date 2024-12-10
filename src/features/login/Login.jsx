import React from "react";
import FullLogo from "../../assets/icons/FullLogo";
import MailIcon from "../../assets/icons/MailIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import ButtonGradient from "@/components/ButtonGradient";

export default function Login() {
  return (
    <div className="relative px-2 py-20 h-full bg-[url('/background-image.png')] bg-cover bg-center before:absolute before:inset-0 before:bg-[#0D192C] before:bg-opacity-[89%] before:content-[''] flex justify-center text-slate-100">
      <div className="z-10 flex flex-col items-center justify-around w-full h-full max-w-md">
        <FullLogo className="max-w-[162.5px]" />
        <div className="space-y-4 text-center">
          <h5 className="text-sm font-light tracking-widest uppercase">
            brand manager
          </h5>
          <h1 className="text-5xl font-semibold capitalize">
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
              className="w-full py-5 pl-10 text-white bg-transparent border-b-2 peer placeholder:text-center focus:bg-transparent focus:border-b-lime-500 border-b-gray-400 focus:outline-none"
            />
            <div className="absolute -translate-y-1/2 top-1/2 size-6 peer-focus:text-lime-500">
              <MailIcon className="size-full" />
            </div>
          </div>
          <div className="relative ">
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              className="w-full py-5 pl-10 text-white bg-transparent border-b-2 peer placeholder:text-center focus:bg-transparent focus:border-b-lime-500 border-b-gray-400 focus:outline-none"
            />
            <div className="absolute -translate-y-1/2 top-1/2 size-6 peer-focus:text-lime-500">
              <PasswordIcon className="size-full" />
            </div>
            <div className="absolute right-0 -translate-y-1/2 top-1/2">
              <span>Forgot</span>
            </div>
          </div>
        </div>

        <ButtonGradient>login</ButtonGradient>
      </div>
    </div>
  );
}
