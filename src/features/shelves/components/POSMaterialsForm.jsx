import React, { useState } from "react";
import BaseButton from "@/components/buttons/BaseButton";
import BrandsDropdown from "@/components/dropdowns/BrandsDropdown";

import ImagePicker from "@/components/file_pickers/ImagePicker";
import BaseInput from "@/components/inputs/BaseInput";

import { validationRules } from "@/consts";
import { useForm } from "react-hook-form";
import { useCreatePOSMaterial } from "../api/mutations/useCreatePOSMaterial";
import { useGetAllPosMaterials } from "../api/queries/useGetAllPosMaterials";

export default function POSMaterialsForm({ onClose }) {
  const { refetch: fetchAllPosMaterials } = useGetAllPosMaterials({
    setToUrl: false,
    isEnabled: false,
  });
  const { mutate: createPOSMaterials, isLoading } = useCreatePOSMaterial();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [images, setImages] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  function resetFields() {
    reset();
    setImages([]);
    setSelectedBrand([]);
  }
  function handelClose() {
    resetFields();
    onClose();
  }
  function onSubmit(item) {
    const data = {
      image: images[0],
      brand_id: selectedBrand?.[0].id,
      name: item.name,
      cost: item.cost,
    };
    console.log("🚀 ~ onSubmit ~ data:", data);
    createPOSMaterials(data, {
      onSuccess() {
        fetchAllPosMaterials();
        handelClose();
      },
    });
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
      <BaseInput
        id="name"
        label="Name"
        palceholder="Enter Value"
        className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""}`}
        register={register("name", validationRules.name)}
      />
      <BrandsDropdown
        selected={selectedBrand}
        setSelected={(data) => {
          data?.id != selectedBrand?.[0]?.id && setSelectedBrand([data]);
        }}
      />
      <BaseInput
        id="cost"
        label="Cost"
        palceholder="Enter Cost"
        className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""}`}
        register={register("cost", validationRules.required)}
      />
      <div className="flex items-center gap-4">
        <BaseButton onClick={handelClose} isDisabled={isLoading}>
          cancel
        </BaseButton>
        <BaseButton
          variant="gradient"
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          confirm
        </BaseButton>
      </div>
    </form>
  );
}
