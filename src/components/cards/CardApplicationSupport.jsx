import React from "react";
import BorderBox from "../box/BorderBox";
import LinkedinIcon from "@/assets/icons/LinkedinIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import ChatIcon from "@/assets/icons/ChatIcon";
import ImageDialog from "../dialogs/ImageDialog";
import { Link } from "react-router-dom";

export default function CardApplicationSupport({ user }) {
  console.log("🚀 ~ user:", user);
  return (
    <BorderBox className="lg:p-3 h-fit">
      <div className="flex items-center gap-4">
        <ImageDialog
          src={user?.image?.url || "/placeholder-image.webp"}
          name={user?.name}
          className="object-cover object-center w-12 h-16 rounded-lg"
        />
        <div className="flex flex-col gap-1 flex-1 h-16 capitalize">
          <p className="text-sm font-medium text-custom_text_four cursor-pointer">
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
            {/* {user?.contacts?.length > 0 &&
              user.contacts.map((contact, i) => {
                contact.type == "whatsapp" ? (
                  <WhatsappIcon className="size-4" />
                ) : contact.type == "linkedin" ? (
                  <LinkedinIcon className="size-4" />
                ) : null;
              })} */}
            {user?.contacts?.length > 0 &&
              user.contacts.map((contact, i) => {
                return contact.type == "whatsapp" ? (
                  <Link
                    to={contact.details}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsappIcon className="size-4" />
                  </Link>
                ) : contact.type == "linkedin" ? (
                  <Link
                    to={contact.details}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon className="size-4" />
                  </Link>
                ) : null;
              })}
            {/* <LinkedinIcon className="size-4" />
            <WhatsappIcon className="size-4" /> */}
            {/* <FacebookIcon className="size-4" />
            <MessageIcon className="size-4" />
            <PhoneIcon className="size-4" />
            <div
              className="flex items-center justify-center cursor-pointer"
              
            >
              <ChatIcon className="size-5" />
            </div> */}
          </div>
        </div>
      </div>
    </BorderBox>
  );
}
