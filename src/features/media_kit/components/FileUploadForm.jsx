// import React from "react";

// export default function FileUploadForm() {
//   return <div>FileUploadForm</div>;
// }
import React, { useEffect, useState } from "react";
import BaseButton from "@/components/buttons/BaseButton";
import BrandsDropdown from "@/components/dropdowns/BrandsDropdown";

import ImagePicker from "@/components/file_pickers/ImagePicker";
// import BaseInput from "@/components/inputs/BaseInput";

import { validationRules } from "@/consts";
import { useForm } from "react-hook-form";
import CloseIcon from "@/assets/icons/CloseIcon";
import { useMediaKitFileUpload } from "../api/mutations/useMediaKitFileUpload";
import { useGetAllMediaKits } from "../api/queries/useGetAllMediaKits";
// import StandTypeDropdown from "@/components/dropdowns/StandTypeDropdown";
// import StoresDropdown from "@/components/dropdowns/StoresDropdown";
// import { useCreateStand } from "../api/mutations/useCreateStand";
// import { useGetAllShelves } from "../api/queries/useGetAllShelves";

export default function FileUploadForm({ onClose, item }) {
  const { data: allMediaKits, refetch: fetchAllMediaKits } = useGetAllMediaKits(
    {
      brandId: item.brandId,
      category: item.category,
    }
  );
  const {
    register,
    formState,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
  } = useForm();
  const [files, setFiles] = useState([]);
  const { mutate: mediaKitFileUpload, isLoading } = useMediaKitFileUpload();
  // const { refetch: fetchAllShelves } = useGetAllShelves({
  //   setToUrl: false,
  //   isEnabled: false,
  // });
  // const { errors } = formState;
  // const [selectedBrand, setSelectedBrand] = useState([]);
  // const [selectedStandType, setSelectedStandType] = useState([]);
  // const [selectedStore, setSelectedStore] = useState([]);
  function resetFields() {
    reset();
    setFiles([]);
    // setSelectedBrand([]);
    // setSelectedStandType([]);
    // setSelectedStore([]);
  }
  function handelClose() {
    resetFields();
    onClose();
  }
  // useEffect(() => {
  //   const fieldsToUpdate = [
  //     { key: "files", value: files?.[0] },
  //     // { key: "brand_id", value: selectedBrand?.[0]?.id },
  //     // { key: "stand_type_id", value: selectedStandType?.[0]?.id },
  //     // { key: "client_id", value: selectedStore?.[0]?.id },
  //   ];

  //   fieldsToUpdate.forEach(({ key, value }) => {
  //     setValue(key, value);
  //     clearErrors(key);
  //   });
  // }, [files, selectedBrand, selectedStandType, selectedStore]);
  function onSubmit(data) {
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
    if (files.length === 0) {
      return;
    }
    mediaKitFileUpload(
      { ...item, file: files[0] },
      {
        onSuccess() {
          fetchAllMediaKits();
          handelClose();
        },
      }
    );
  }

  return (
    <form
      className="flex flex-col mt-4 space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ImagePicker
        hidePreview
        title="Upload"
        subTitle="pdf,xml,doc,jpg,png (max size 2 MB)"
        accept="application/pdf,application/xml,application/msword,image/jpeg,image/png"
        images={files}
        setImages={setFiles}

        // isError={errors?.profile_image?.message}
      />
      {files.length > 0 &&
        files.map((file, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center h-32 p-3 mx-auto rounded-lg w-fit"
          >
            <button
              type="button"
              onClick={() => setFiles([])}
              className="absolute flex items-center justify-center text-white bg-red-500 rounded-full opacity-85 top-2 right-2 size-6 hover:opacity-100"
            >
              {/* &times; */}
              <CloseIcon className="size-3" />
            </button>
            {file.name}
          </div>
        ))}
      {/* <BrandsDropdown
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
      <StoresDropdown
        selected={selectedStore}
        setSelected={(data) => {
          data?.id != selectedStore?.[0]?.id && setSelectedStore([data]);
        }}
      />
      <div className="flex items-center gap-4">
        <BaseInput
          id="location"
          label="location"
          palceholder="Enter location"
          className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""}`}
          register={register("location", validationRules.required)}
        />
        <BaseInput
          id="cost"
          label="Cost"
          palceholder="Enter Cost"
          className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""}`}
          register={register("cost", validationRules.required)}
        />
      </div> */}
      <div className="flex items-center gap-4">
        <BaseButton onClick={handelClose} isDisabled={isLoading}>
          cancel
        </BaseButton>
        <BaseButton
          isDisabled={isLoading}
          isLoading={isLoading}
          variant="gradient"
          type="submit"
        >
          confirm
        </BaseButton>
      </div>
    </form>
  );
}
