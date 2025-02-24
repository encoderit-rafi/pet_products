import React from "react";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BorderBox from "@/components/box/BorderBox";
import IconButton from "@/components/buttons/IconButton";
import ImageDialog from "@/components/dialogs/ImageDialog";

export default function UserCard({ data, onClickEdit, onClickDelete }) {
  return (
    <BorderBox className="p-2 lg:p-2 !border-custom_line_eight">
      <div className="flex items-center gap-2">
        <div className="p-1 size-14 bg-custom_bg_two rounded-2xl shrink-0">
          <ImageDialog
            className="object-cover rounded-lg size-full"
            src={data.image?.url || "/placeholder-image.webp"}
            name={data.name}
          />
        </div>
        <div className="flex flex-col justify-center flex-1 capitalize">
          <p className="text-sm font-normal text-custom_text_four">
            {data.name}
          </p>
          <div className="flex overflow-x-auto divide-x max-w-52 divide-custom_line_two">
            {data?.roles?.map((role) => (
              <p
                key={role.id}
                className="px-1 text-xs whitespace-nowrap text-custom_text_five font-extralight"
              >
                {role.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-custom_yellow">
          <IconButton onClick={onClickEdit}>
            <EditIcon className="size-4" />
          </IconButton>
          <IconButton onClick={onClickDelete}>
            <DeleteIcon className="size-4" />
          </IconButton>
        </div>
      </div>
    </BorderBox>
  );
}
