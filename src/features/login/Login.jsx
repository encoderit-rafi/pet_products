import React from "react";
import FullLogo from "../../assets/icons/FullLogo";
import MailIcon from "../../assets/icons/MailIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";

export default function Login() {
  return (
    <div className="relative px-2 py-20 h-full bg-[url('https://plus.unsplash.com/premium_photo-1682144741954-3a9dcea81dd2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center before:absolute before:inset-0 before:bg-slate-950/85 before:content-[''] flex justify-center text-slate-100">
      <div className="z-10 flex flex-col items-center justify-around w-full h-full max-w-md">
        <FullLogo />
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
              className="w-full py-5 pl-10 text-white bg-transparent border-b-2 peer placeholder:text-center focus:bg-transparent focus:border-b-green-500 border-b-gray-400 focus:outline-none"
            />
            <div className="absolute -translate-y-1/2 top-1/2 size-6 peer-focus:text-green-500">
              <MailIcon className="size-full" />
            </div>
          </div>
          <div className="relative ">
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              className="w-full py-5 pl-10 text-white bg-transparent border-b-2 peer placeholder:text-center focus:bg-transparent focus:border-b-green-500 border-b-gray-400 focus:outline-none"
            />
            <div className="absolute -translate-y-1/2 top-1/2 size-6 peer-focus:text-green-500">
              <PasswordIcon className="size-full" />
            </div>
            <div className="absolute right-0 -translate-y-1/2 top-1/2">
              <span>Forgot</span>
            </div>
          </div>
        </div>
        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-lime-600 from-60% to-lime-500 text-lg capitalize">
          login
        </button>
      </div>
    </div>
  );
}
