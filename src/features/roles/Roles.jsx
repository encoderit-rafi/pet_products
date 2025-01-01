import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";

import BorderBox from "@/components/box/BorderBox";
import Title from "@/components/texts/Title";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import Label from "@/components/texts/Label";
import BaseSelectDropdown from "@/components/dropdowns/BaseSelectDropdown";
import InputText from "@/components/inputs/InputText";
import BaseButton from "@/components/buttons/BaseButton";
import { useState } from "react";
import Dialog from "@/components/dialogs/Dialog";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber";
import BaseInput from "@/components/inputs/BaseInput";
import IconButton from "@/components/buttons/IconButton";

export default function Roles() {
  const [isOpenAddNewStand, setIsOpenAddNewStand] = useState(false);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <Title> Assigned Roles Add New</Title>

        <div className="flex items-center gap-4">

          <BaseButton
            variant="orange"
            icon="plus"
            className="text-xs max-w-fit px-3 lg:px-5"
            onClick={() => setIsOpenAddNewStand(true)}
          >
            <span className="hidden lg:block">add new</span>
          </BaseButton>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2 md:grid-cols-3">
        <BorderBox className="p-2 lg:p-2 !border-custom_line_eight">
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-normal text-custom_text_four">
                m. khalid saied
              </p>
              <p className="text-xs text-custom_text_five font-extralight">
                role here
              </p>
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
      </div>
      <Dialog
        isOpen={isOpenAddNewStand}
        title="add new stand"
        className="max-w-lg "
      >
        <div className="flex flex-col mt-4 space-y-4">
          <ImagePicker />
          <div className="space-y-4 overflow-auto max-h-32 lg:max-h-72">
            <BaseInput
              id="email"
              type="email"
              label="email"
              palceholder="email"
              className="py-3 rounded-lg"
            />

            <div className="space-y-2">
              <Label
                id="phone_number"
                label="phone number"
                palceholder="phone number"
              />
              <InputPhoneNumber />
            </div>
            <div className="space-y-2">
              <Label id="access" label="access" palceholder="access type" />
              <BaseSelectDropdown />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenAddNewStand(false)}>
              cancel
            </BaseButton>
            <BaseButton variant="gradient">confirm</BaseButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
