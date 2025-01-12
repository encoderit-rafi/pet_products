import React, { useState } from "react";

import ToggleLogo from "@/components/ui/ToggleLogo";
import BrandHeading from "@/components/ui/BrandHeading";
import LoginForm from "../components/LoginForm";
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
        <LoginForm />
      </div>
    </div>
  );
}
