import CameraIcon from "@/assets/icons/CameraIcon";
import ImageIcon from "@/assets/icons/ImageIcon";
import InputBox from "@/components/box/InputBox";
import BaseButton from "@/components/buttons/BaseButton";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import ImagePreview from "@/components/file_pickers/ImagePreview";
import BaseInput from "@/components/inputs/BaseInput";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber";
import InputPlace from "@/components/inputs/InputPlace";
import Label from "@/components/texts/Label";
import { useAuth } from "@/context/AuthProvider";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { omitEmpty, validationRules } from "@/consts";
import { useUpdateAuthUser } from "@/api/auth/mutations/useUpdateAuthUser";
import { useAuthUserQuery } from "@/api/auth/queries/useAuthUserQuery";
import ImagePickerIcon from "@/components/file_pickers/ImagePickerIcon";
import cn from "@/lib/utils/cn";
import Drawer from "@/components/navigators/Drawer";
import Webcam from "react-webcam";
import base64ToFile from "@/lib/utils/base64ToFile";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
export default function AuthUserForm({ setIsOpen }) {
  const { data: authUserData, refetch: fetchAuthUser } = useAuthUserQuery();

  const {
    mutate: updateAuthUser,
    isLoading: isLoadingUpdateAuthUser,
    // isError: isErrorUpdateAuthUser,
  } = useUpdateAuthUser();
  const { user, setUser } = useAuth();
  // const [isOpenCapImageDrawer, setIsOpenCapImageDrawer] = useState(false);
  const [number, setNumber] = useState();
  const [images, setImages] = useState([]);
  const [isOpenCapImageDrawer, setIsOpenCapImageDrawer] = useState();
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    // const imageSrc = webcamRef.current.getScreenshot();
    setImages([base64ToFile(webcamRef.current.getScreenshot())]);
    setIsOpenCapImageDrawer(false);
  }, [webcamRef]);
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    errors,
    clearErrors,
  } = useForm();
  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setNumber(user.phone_number);
  }, [user]);
  useEffect(() => {
    const fieldsToUpdate = [
      { key: "profile_image", value: images },
      { key: "phone_number", value: number },
    ];

    fieldsToUpdate.forEach(({ key, value }) => {
      setValue(key, value);
      clearErrors(key);
    });
  }, [images, number]);
  useEffect(() => {
    setUser(authUserData);
  }, [authUserData]);
  function onSubmit(data) {
    "✅ ~ file: AuthUserForm.jsx:38 ~ onSubmit ~ data:", data;
    const validations = [
      {
        key: "phone_number",
        condition: (value) => value.length <= 3,
        message: "Phone number is required",
      },
    ].filter(Boolean);
    for (const { key, condition, message } of validations) {
      if (condition(data[key])) {
        setError(key, { type: "manual", message });
        return;
      }
    }
    updateAuthUser(
      {
        data: omitEmpty({
          ...data,
          profile_image: data.profile_image[0],
        }),
      },
      {
        onSuccess: () => {
          fetchAuthUser();
          setIsOpen(false);
        },
      }
    );
  }
  function onHandleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    selectedFiles?.length > 0 && setImages(selectedFiles);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
      <div className="flex-1 mt-5 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <ImagePickerIcon handleFileChange={onHandleFileChange} />
          <ImagePreview
            src={
              images?.length > 0
                ? URL.createObjectURL(images[0])
                : user?.image?.url
            }
            className="size-28"
            hideCloseButton
          />
          <div
            className={cn(
              "flex items-center justify-center px-6 py-3 bg-transparent border rounded-full cursor-pointer text-custom_yellow border-custom_line_nine"
            )}
            onClick={() => setIsOpenCapImageDrawer(true)}
          >
            <CameraIcon className="size-5" />
          </div>
        </div>

        <BaseInput
          id="name"
          type="name"
          label="name"
          palceholder="Name"
          className="py-3 rounded-lg"
          register={register("name", validationRules.name)}
        />
        <BaseInput
          id="email"
          type="email"
          label="email"
          palceholder="Email"
          className="py-3 rounded-lg"
          register={register("email", validationRules.email)}
        />
        <InputBox className="flex flex-col w-full">
          <Label id="phone_number" label="phone number" />
          <InputPhoneNumber
            number={number}
            setNumber={(val) => setNumber(val)}
            isError={errors?.phone_number}
          />
        </InputBox>
      </div>
      <div className="flex gap-4 mt-10">
        <BaseButton
          className="text-xs font-light lg:text-sm"
          onClick={() => {
            setImages([]);
            setIsOpen();
          }}
          isDisabled={isLoadingUpdateAuthUser}
        >
          cancel
        </BaseButton>
        <BaseButton
          type="submit"
          variant="gradient"
          className="text-xs font-light lg:text-sm"
          isLoading={isLoadingUpdateAuthUser}
          isDisabled={isLoadingUpdateAuthUser}
          // onClick={setIsOpen}
        >
          save change
        </BaseButton>
      </div>
      <Drawer isOpen={isOpenCapImageDrawer}>
        <div className="h-full flex flex-col">
          <div className="flex-1">
            {isOpenCapImageDrawer && (
              <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
                className="rounded-lg"
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenCapImageDrawer(false)}>
              close
            </BaseButton>
            <BaseButton variant="gradient" onClick={capture}>
              capture
            </BaseButton>
          </div>
        </div>
      </Drawer>
    </form>
  );
}
