import React from "react";
import BorderBox from "../box/BorderBox";
import LinkedinIcon from "@/assets/icons/LinkedinIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";

export default function CardApplicationSupport({ ...props }) {
  return (
    <BorderBox
      className="cursor-pointer lg:p-3 h-fit"
      {...props}
      // onClick={() => setIsOpenDrawerSingleApplicationSupport(true)}
    >
      <div className="flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="object-cover object-center w-12 h-16 rounded-lg"
        />

        <div className="flex flex-col justify-between flex-1 h-16 capitalize">
          <p className="text-sm font-medium text-custom_text_four">
            m. khalid saied
          </p>
          <p className="text-xs text-gray-400">role here</p>
          <div className="flex items-center gap-3 text-custom_yellow">
            <LinkedinIcon className="size-4" />
            <FacebookIcon className="size-4" />
            <WhatsappIcon className="size-4" />
            <MessageIcon className="size-4" />
            <PhoneIcon className="size-4" />
          </div>
        </div>
      </div>
    </BorderBox>
  );
}
