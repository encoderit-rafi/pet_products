import React from "react";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BorderBox from "@/components/box/BorderBox";
import IconButton from "@/components/buttons/IconButton";
import ImageDialog from "@/components/dialogs/ImageDialog";

export default function RoleCard({ data, onClickEdit, onClickDelete }) {
  return (
    <BorderBox className="p-2 lg:p-2 !border-custom_line_eight">
      <div className="flex items-center gap-2">
        <div className="flex flex-col  flex-1 capitalize">
          <p className="text-sm font-normal text-custom_text_four">
            {data.name}
          </p>
          <div className="flex overflow-x-auto divide-x max-w-64 divide-custom_line_two">
            {data?.permissions.length > 0 ? (
              data?.permissions?.map((permission) => (
                <p
                  key={permission.id}
                  className="px-1 text-xs whitespace-nowrap text-custom_text_five font-extralight"
                >
                  {permission.name.split("_").join(" ")}
                </p>
              ))
            ) : (
              <p className="px-1 text-xs whitespace-nowrap text-custom_text_five font-extralight">
                No Permission
              </p>
            )}
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
