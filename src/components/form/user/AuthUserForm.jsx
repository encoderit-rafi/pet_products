import CameraIcon from "@/assets/icons/CameraIcon";
import ImageIcon from "@/assets/icons/ImageIcon";
import InputBox from "@/components/box/InputBox";
import BaseButton from "@/components/buttons/BaseButton";
import ImagePreview from "@/components/file_pickers/ImagePreview";
import BaseInput from "@/components/inputs/BaseInput";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber";
import InputPlace from "@/components/inputs/InputPlace";
import Label from "@/components/texts/Label";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AuthUserForm({ setIsOpen }) {
  const { user } = useAuth();
  const [number, setNumber] = useState();
  console.log("✅ ~ file: AuthUserForm.jsx:16 ~ AuthUserForm ~ user:", user);
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm();
  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setNumber(user.phone_number);
  }, [user]);
  return (
    <>
      <div className="flex-1 mt-5 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center px-6 py-3 bg-transparent border rounded-full border-custom_line_four siz-10 text-custom_yellow">
            <ImageIcon className="size-5" />
          </div>
          {/* <img
            src={user?.image?.url || "/placeholder-image.webp"}
            alt={user.name}
            onError={(e) => (e.target.src = "/placeholder-image.webp")}
            className="object-cover object-center rounded-2xl size-28"
          /> */}
          <ImagePreview
            src={user?.image?.url}
            className="size-28"
            hideCloseButton
          />
          <div className="flex items-center justify-center px-6 py-3 bg-transparent border rounded-full border-custom_line_four siz-10 text-custom_yellow">
            <CameraIcon className="size-5" />
          </div>
        </div>

        <BaseInput
          id="name"
          type="name"
          label="name"
          palceholder="Name"
          className="py-3 rounded-lg"
          register={{ ...register("name") }}
        />
        <BaseInput
          id="email"
          type="email"
          label="email"
          palceholder="Email"
          className="py-3 rounded-lg"
          register={{ ...register("email") }}
        />
        <InputBox className="flex flex-col w-full">
          <Label id="phone_number" label="phone number" />
          <InputPhoneNumber
            number={number}
            setNumber={(val) => setNumber(val)}
          />
        </InputBox>
        {/* <InputBox className="flex flex-col w-full">
          <Label id="address" label="address" />
          <InputPlace />
        </InputBox> */}
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
          // onClick={setIsOpen}
        >
          save change
        </BaseButton>
      </div>
    </>
  );
}
