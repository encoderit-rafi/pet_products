import React, { useEffect, useState } from "react";
import BaseButton from "@/components/buttons/BaseButton";
import BrandsDropdown from "@/components/dropdowns/BrandsDropdown";

import ImagePicker from "@/components/file_pickers/ImagePicker";
import BaseInput from "@/components/inputs/BaseInput";

import { validationRules } from "@/consts";
import { useForm } from "react-hook-form";
import StandTypeDropdown from "@/components/dropdowns/StandTypeDropdown";
import StoresDropdown from "@/components/dropdowns/StoresDropdown";
import BaseDatePicker from "@/components/file_pickers/BaseDatePicker";
import Label from "@/components/texts/Label";
import InputBox from "@/components/box/InputBox";
// import { useCreateStand } from "../api/mutations/useCreateStand";
// import { useGetAllShelves } from "../api/queries/useGetAllShelves";

export default function MarketingActivitiesForm({ onClose }) {
  const {
    register,
    formState,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
  } = useForm();
  // const { mutate: createStand, isLoading } = useCreateStand();
  // const { refetch: fetchAllShelves } = useGetAllShelves({
  //   setToUrl: false,
  //   isEnabled: false,
  // });
  const { errors } = formState;
  const [images, setImages] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedStandType, setSelectedStandType] = useState([]);
  const [selectedStore, setSelectedStore] = useState([]);
  function resetFields() {
    reset();
    setImages([]);
    setSelectedBrand([]);
    setSelectedStandType([]);
    setSelectedStore([]);
  }
  function handelClose() {
    resetFields();
    onClose();
  }
  // useEffect(() => {
  //   const fieldsToUpdate = [
  //     { key: "images", value: images?.[0] },
  //     { key: "brand_id", value: selectedBrand?.[0]?.id },
  //     { key: "stand_type_id", value: selectedStandType?.[0]?.id },
  //     { key: "client_id", value: selectedStore?.[0]?.id },
  //   ];

  //   fieldsToUpdate.forEach(({ key, value }) => {
  //     setValue(key, value);
  //     clearErrors(key);
  //   });
  // }, [images, selectedBrand, selectedStandType, selectedStore]);
  function onSubmit(item) {
    console.log("🚀 ~ onSubmit ~ item:", item);
    // const validations = [
    //   {
    //     key: "brand_id",
    //     condition: (value) => value.length === 0,
    //     message: "Brand is required",
    //   },
    //   {
    //     key: "stand_type_id",
    //     condition: (value) => value.length === 0,
    //     message: "Stand type is required",
    //   },
    //   {
    //     key: "client_id",
    //     condition: (value) => value.length === 0,
    //     message: "Store is required",
    //   },
    // ].filter(Boolean);
    // for (const { key, condition, message } of validations) {
    //   if (condition(item[key])) {
    //     setError(key, { type: "manual", message });
    //     return;
    //   }
    // }
    // createStand(item, {
    //   onSuccess() {
    //     fetchAllShelves();
    //     handelClose();
    //   },
    // });
  }

  return (
    <form
      className="flex flex-col mt-4 space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ImagePicker
        images={images}
        setImages={setImages}
        // isError={errors?.profile_image?.message}
      />
      <div className="grid grid-cols-2 gap-2">
        <BrandsDropdown
          selected={selectedBrand}
          setSelected={(data) => {
            data?.id != selectedBrand?.[0]?.id && setSelectedBrand([data]);
          }}
        />
        <StandTypeDropdown
          isDisable={selectedBrand?.length == 0 ? true : false}
          params={{ brand_id: selectedBrand?.[0]?.id }}
          selected={selectedStandType}
          setSelected={(data) => {
            data?.id != selectedStandType?.[0]?.id &&
              setSelectedStandType([data]);
          }}
        />
        <InputBox className="">
          <Label label={"date"} />

          <BaseDatePicker />
        </InputBox>
        <BaseInput
          id="total"
          label="total"
          palceholder="total"
          type="number"
          className={`py-3 rounded-lg ${
            errors?.total ? "!border-red-500" : ""
          }`}
          register={register("total", validationRules.required)}
        />
        <BaseInput
          id="channel"
          label="channel"
          palceholder="channel"
          className={`py-3 rounded-lg ${
            errors?.channel ? "!border-red-500" : ""
          }`}
          register={register("channel", validationRules.required)}
        />
        <BaseInput
          id="platform"
          label="platform"
          palceholder="platform"
          className={`py-3 rounded-lg ${
            errors?.platform ? "!border-red-500" : ""
          }`}
          register={register("platform", validationRules.required)}
        />
        <BaseInput
          id="reach"
          label="reach"
          palceholder="reach"
          type="number"
          className={`py-3 rounded-lg ${
            errors?.reach ? "!border-red-500" : ""
          }`}
          register={register("reach", validationRules.required)}
        />
      </div>
      <div className="flex items-center gap-4">
        <BaseButton
          onClick={handelClose}
          // isDisabled={isLoading}
        >
          cancel
        </BaseButton>
        <BaseButton
          // isDisabled={isLoading}
          // isLoading={isLoading}
          variant="gradient"
          type="submit"
        >
          confirm
        </BaseButton>
      </div>
    </form>
  );
}
