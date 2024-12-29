import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import ButtonWithIcon from "@/components/buttons/ButtonWithIcon";
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

export default function Roles() {
  const [isOpenAddNewStand, setIsOpenAddNewStand] = useState(false);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <Title> Assigned Roles Add New</Title>

        <div className="flex items-center gap-4">
          <ButtonWithIcon onClick={() => setIsOpenAddNewStand(true)} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2 md:grid-cols-3">
        <BorderBox className="px-3 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-medium text-custom_text_four">
                m. khalid saied
              </p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <EditIcon className="size-3" />
              </div>
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <DeleteIcon className="size-3" />
              </div>
            </div>
          </div>
        </BorderBox>
        <BorderBox className="px-3 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-medium text-custom_text_four">
                m. khalid saied
              </p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <EditIcon className="size-3" />
              </div>
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <DeleteIcon className="size-3" />
              </div>
            </div>
          </div>
        </BorderBox>
        <BorderBox className="px-3 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-medium text-custom_text_four">
                m. khalid saied
              </p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <EditIcon className="size-3" />
              </div>
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <DeleteIcon className="size-3" />
              </div>
            </div>
          </div>
        </BorderBox>
        <BorderBox className="px-3 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-medium text-custom_text_four">
                m. khalid saied
              </p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <EditIcon className="size-3" />
              </div>
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <DeleteIcon className="size-3" />
              </div>
            </div>
          </div>
        </BorderBox>
        <BorderBox className="px-3 py-4">
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-medium text-custom_text_four">
                m. khalid saied
              </p>
              <p className="text-xs text-gray-400">show profile</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <EditIcon className="size-3" />
              </div>
              <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
                <DeleteIcon className="size-3" />
              </div>
            </div>
          </div>
        </BorderBox>
      </div>
      <Dialog
        isOpen={isOpenAddNewStand}
        title="add new stand"
        className="max-w-lg "
      >
        <div className="flex flex-col space-y-4">
          <ImagePicker />
          <div className="overflow-auto max-h-72">
            <InputText
              id="email"
              type="email"
              label="email"
              palceholder="email"
              className="py-3 rounded-lg"
            />

            <div className="space-y-2">
              <Label id="phone_number" label="phone_number" palceholder="phone_number" />
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
