import React from "react";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BorderBox from "@/components/box/BorderBox";
import IconButton from "@/components/buttons/IconButton";

export default function UserCard({ data }) {
  return (
    <BorderBox className="p-2 lg:p-2 !border-custom_line_eight">
      <div className="flex items-center gap-2">
        <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
          <img
            src="/placeholder-image.webp"
            alt=""
            className="object-cover h-full rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 capitalize">
          <p className="text-sm font-normal text-custom_text_four">
            {data.name}
          </p>
          <div className="flex divide-x divide-custom_line_two">
            {data.roles.map((role) => (
              <p
                key={role.id}
                className="px-1 text-xs text-custom_text_five font-extralight"
              >
                {role.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-custom_yellow">
          <IconButton>
            <EditIcon className="size-4" />
          </IconButton>
          <IconButton>
            <DeleteIcon className="size-4" />
          </IconButton>
        </div>
      </div>
    </BorderBox>
  );
}
