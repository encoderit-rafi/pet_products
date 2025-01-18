import CameraIcon from "@/assets/icons/CameraIcon";
import ImageIcon from "@/assets/icons/ImageIcon";
import BaseInput from "../inputs/BaseInput";
import Drawer from "../navigators/Drawer";
import BaseButton from "../buttons/BaseButton";
import Label from "../texts/Label";
import InputPlace from "../inputs/InputPlace";
import InputPhoneNumber from "../inputs/InputPhoneNumber";
export default function DrawerSingleApplicationSupport({
  isOpen,
  setIsOpen,
}) {
  return (
    <Drawer isOpen={isOpen} className="flex flex-col max-w-md">
      <div className="flex-1 mt-5 space-y-3 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center px-6 py-3 bg-transparent border rounded-full border-custom_line_four siz-10 text-custom_yellow">
            <ImageIcon className="size-5" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover object-center rounded-2xl size-28"
          />
          <div className="flex items-center justify-center px-6 py-3 bg-transparent border rounded-full border-custom_line_four siz-10 text-custom_yellow">
            <CameraIcon className="size-5" />
          </div>
        </div>

        <BaseInput
          id="email"
          type="email"
          label="email"
          palceholder="email"
          className="py-3 rounded-lg"
        />
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="w-[49%]">
            <BaseInput
              id="first name"
              type="first name"
              label="first name"
              palceholder="first name"
              className="py-3 rounded-lg"
            />
          </div>
          <div className="w-[49%]">
            <BaseInput
              id="last name"
              type="last name"
              label="last name"
              palceholder="last name"
              className="py-3 rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label id="phone_number" label="phone number" />
          <InputPhoneNumber />
        </div>
        <div className="space-y-2">
          <Label id="address" label="address" />
          <InputPlace />
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        <BaseButton
          className="text-xs font-light lg:text-sm"
          onClick={setIsOpen}
        >
          cancel
        </BaseButton>
        <BaseButton
          variant="gradient"
          className="text-xs font-light lg:text-sm"
          onClick={setIsOpen}
        >
          save change
        </BaseButton>
      </div>
    </Drawer>
  );
}
