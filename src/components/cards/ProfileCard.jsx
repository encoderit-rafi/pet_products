import React from "react";

export default function ProfileCard() {
  return (
    <div className="flex gap-1 lg:gap-4">
      <div className="p-1 size-12 bg-custom_bg_five rounded-[13px] shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rounded-xl"
        />
      </div>
      <div className="lg:flex hidden flex-col justify-center capitalize">
        <p className="text-sm font-normal text-custom_text_four">
          m. khalid saied
        </p>
        <p className="text-xs text-custom_text_five font-extralight">
          show profile
        </p>
      </div>
    </div>
  );
}
