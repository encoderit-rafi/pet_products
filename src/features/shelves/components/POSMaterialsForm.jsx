import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import CloseIcon from "@/assets/icons/CloseIcon";
import BaseButton from "@/components/buttons/BaseButton";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import BrandsDropdown from "@/components/dropdowns/BrandsDropdown";
import PosMaterialsDropdown from "@/components/dropdowns/PosMaterialsDropdown";
import ProductsDropdown from "@/components/dropdowns/ProductsDropdown";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import BaseInput from "@/components/inputs/BaseInput";
import Label from "@/components/texts/Label";
import SelectionBox from "@/components/ui/SelectionBox";
import { validationRules } from "@/consts";
import { useGetAllProducts } from "@/features/products/api/queries/useGetAllProducts";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function POSMaterialsForm({ onClose }) {
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
    getValues,
  } = useForm();
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
    // const validations = [
    //   (formValues.type == "create" ||
    //     (formValues.type == "update" && formValues.user.image == null) ||
    //     (formValues.type == "update" &&
    //       formValues.user.image != null &&
    //       selectNewImages)) && {
    //     key: "profile_image",
    //     condition: (value) => value?.length === 0,
    //     message: "Select an image",
    //   },
    //   {
    //     key: "phone_number",
    //     condition: (value) => value?.length <= 3,
    //     message: "Phone number is required",
    //   },
    //   {
    //     key: "brand_ids",
    //     condition: (value) => value.length === 0,
    //     message: "Select a brand",
    //   },
    //   {
    //     key: "role_ids",
    //     condition: (value) => value.length === 0,
    //     message: "Select a role",
    //   },
    // ].filter(Boolean);
    // for (const { key, condition, message } of validations) {
    //   if (condition(data[key])) {
    //     setError(key, { type: "manual", message });
    //     return;
    //   }
    // }
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
        // value={cost}
        // onChange={(e) => {
        //   setCost(e.target.value);
        // }}
        className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""}`}
        register={register("cost", validationRules.required)}
      />
      <div className="flex items-center gap-4">
        <BaseButton onClick={handelClose}>cancel</BaseButton>
        <BaseButton variant="gradient" type="submit">
          confirm
        </BaseButton>
      </div>
    </form>
  );
}
