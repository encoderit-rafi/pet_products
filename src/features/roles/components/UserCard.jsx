import React, { useState } from "react";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BorderBox from "@/components/box/BorderBox";
import IconButton from "@/components/buttons/IconButton";
import Dialog from "@/components/dialogs/Dialog";
import UserForm from "./UserForm";

export default function UserCard({ data, onClickEdit, onClickDelete }) {
  // console.log('UserCard', data)
  // const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
  // const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);

  return (
    <BorderBox className="p-2 lg:p-2 !border-custom_line_eight">
      <div className="flex items-center gap-2">
        <div className="p-1 size-14 bg-custom_bg_two rounded-2xl shrink-0">
          <img
            src={data.image?.url || "/placeholder-image.webp"}
            alt=""
            className="object-cover size-full rounded-lg"
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
          <IconButton
            onClick={onClickEdit}>
            <EditIcon className="size-4" />
          </IconButton>
          <IconButton
            onClick={onClickDelete}
          >
            <DeleteIcon className="size-4" />
          </IconButton>
        </div>
      </div>
      {/* <Dialog
        isOpen={isOpenUpdateUser}
        title="update user"
        className="max-w-lg "
      >
        <UserForm handelOnClickCancel={() => setIsOpenUpdateUser(false)}
          data={{ ...data, form_type: "update" }}
        />
      </Dialog> */}
    </BorderBox>
  );
}
