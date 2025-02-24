import React from "react";
import BorderBox from "../box/BorderBox";
import LinkedinIcon from "@/assets/icons/LinkedinIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import ChatIcon from "@/assets/icons/ChatIcon";
import ImageDialog from "../dialogs/ImageDialog";

export default function CardApplicationSupport({
  user,
  // onClickOpenSingleApplicationSupport,
  // onClickOpenChat,
}) {
  console.log("🚀 ~ user:", user);
  return (
    <BorderBox className="lg:p-3 h-fit">
      <div className="flex items-center gap-4">
        {/* <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="object-cover object-center w-12 h-16 rounded-lg"
        /> */}
        <ImageDialog
          src={user?.image?.url || "/placeholder-image.webp"}
          name={user?.name}
          className="object-cover object-center w-12 h-16 rounded-lg"
        />
        <div className="flex flex-col justify-between flex-1 h-16 capitalize">
          <p
            className="text-sm font-medium text-custom_text_four cursor-pointer"
            // onClick={onClickOpenSingleApplicationSupport}
          >
            {user?.name}
          </p>
          <div className="flex overflow-x-auto divide-x max-w-52 divide-custom_line_two">
            {user?.roles?.map((role) => (
              <p
                key={role.id}
                className="px-1 text-xs whitespace-nowrap text-custom_text_five font-extralight"
              >
                {role.name}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-3 text-custom_yellow">
            <LinkedinIcon className="size-4" />
            <FacebookIcon className="size-4" />
            <WhatsappIcon className="size-4" />
            <MessageIcon className="size-4" />
            <PhoneIcon className="size-4" />
            <div
              className="flex items-center justify-center cursor-pointer"
              // onClick={onClickOpenChat}
            >
              <ChatIcon className="size-5" />
            </div>
          </div>
        </div>
      </div>
    </BorderBox>
  );
}
