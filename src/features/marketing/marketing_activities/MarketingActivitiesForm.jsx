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
import CategoriesDropdown from "@/components/dropdowns/CategoiresDropdown";
import PlatformsDropdown from "@/components/dropdowns/PlatformsDropdown";
import cn from "@/lib/utils/cn";
import toast from "react-hot-toast";
import { useCreateActivities } from "@/api/marketing/activities/useCreateActivities";
import { useGetAllActivities } from "@/api/marketing/activities/useGetAllActivities";
import { useUpdateActivities } from "@/api/marketing/activities/useUpdateActivities";
// import { useCreateStand } from "../api/mutations/useCreateStand";
// import { useGetAllShelves } from "../api/queries/useGetAllShelves";

export default function MarketingActivitiesForm({ formValues, onClose }) {
  const {
    register,
    formState,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
  } = useForm();
  const { mutate: createActivity, isLoading } = useCreateActivities();
  const { mutate: updateActivity, isLoading: isLoadingUpdate } =
    useUpdateActivities();
  const { refetch: fetchAllActivities } = useGetAllActivities({
    setToUrl: false,
    isEnabled: false,
    all: false,
  });
  const { errors } = formState;
  console.log("🚀 ~ MarketingActivitiesForm ~ errors:", errors);
  // const [formValues, setFormValues] = useState({
  //   type: "create",
  //   isOpen: false,
  //   data: null,
  // });
  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedStandType, setSelectedStandType] = useState([]);
  // const [selectedStore, setSelectedStore] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  useEffect(() => {
    const fieldsToUpdate = [
      // { key: "images", value: images },
      { key: "date", value: date },
      { key: "brand_id", value: selectedBrand[0]?.id },
      { key: "platform_id", value: selectedPlatform[0]?.id },
      { key: "category_id", value: selectedCategory[0]?.id },
      { key: "stand_id", value: selectedStandType[0]?.id },
    ];

    fieldsToUpdate.forEach(({ key, value }) => {
      setValue(key, value);
      clearErrors(key);
    });
  }, [
    images,
    date,
    selectedBrand,
    selectedPlatform,
    selectedCategory,
    selectedStandType,
  ]);
  function resetFields() {
    reset();
    setImages([]);
    setSelectedBrand([]);
    setSelectedPlatform([]);
    setSelectedCategory([]);
    setSelectedStandType([]);
  }
  useEffect(() => {
    if (formValues.type === "update") {
      console.log(
        "🚀 ~ useEffect ~ MarketingActivitiesForm ~ formValues:",
        formValues
      );
      //   {
      //     "id": 1,
      //     "brand_id": 1,
      //     "category_id": 2,
      //     "platform_id": 1,
      //     "stand_id": null,
      //     "date": "2025-02-25",
      //     "total": "5000.00",
      //     "cost": "4500.00",
      //     "channel": null,
      //     "reach": null,
      //     "status": "",
      //     "description": "Instore Marketing",
      //     "created_at": "2025-03-17T04:38:29.000000Z",
      //     "updated_at": "2025-03-17T04:38:29.000000Z"
      // }
      const {
        brand_id,
        category_id,
        platform_id,
        stand_id,
        date,
        total,
        cost,
        channel,
        reach,
        description,
      } = formValues.data;
      setValue("date", date);
      setValue("total", total);
      setValue("cost", cost);
      setValue("channel", channel);
      setValue("reach", reach);
      setValue("description", description);
      setSelectedBrand([{ id: brand_id }]);
      setSelectedCategory([{ id: category_id }]);
      setSelectedPlatform([{ id: platform_id }]);
      setSelectedStandType([{ id: stand_id }]);
    } else {
      resetFields();
    }
  }, [formValues]);
  function handelClose() {
    resetFields();
    onClose();
  }

  function onSubmit(item) {
    console.log("🚀 ~ onSubmit ~ item:", item);
    const validations = [
      {
        key: "brand_id",
        condition: (value) => value === undefined,
        message: "Brand is required",
      },
      {
        key: "platform_id",
        condition: (value) => value === undefined,
        message: "Platform  is required",
      },
      {
        key: "category_id",
        condition: (value) => value === undefined,
        message: "Category is required",
      },
      {
        key: "stand_id",
        condition: (value) => value === undefined,
        message: "Stand is required",
      },
    ].filter(Boolean);
    for (const { key, condition, message } of validations) {
      if (condition(item[key])) {
        toast.error(message);
        setError(key, { type: "manual", message });
        return;
      }
    }
    formValues.type == "create"
      ? createActivity(
          { ...item, date: item.date },
          {
            onSuccess() {
              fetchAllActivities();
              handelClose();
            },
          }
        )
      : updateActivity(
          {
            id: formValues.data.id,
            data: item,
          },
          {
            onSuccess() {
              fetchAllActivities();
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
      {/* <ImagePicker
        images={images}
        setImages={setImages}
        // isError={errors?.profile_image?.message}
      /> */}
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
          <BaseDatePicker date={date} setDate={(date) => setDate(date)} />
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
        <CategoriesDropdown
          selected={selectedCategory}
          setSelected={(data) => {
            data?.id != selectedCategory?.[0]?.id &&
              setSelectedCategory([data]);
          }}
        />
        <PlatformsDropdown
          selected={selectedPlatform}
          setSelected={(data) => {
            data?.id != selectedPlatform?.[0]?.id &&
              setSelectedPlatform([data]);
          }}
          className={"col-span-2 bg-slate-500 w-full"}
        />
        <InputBox className="flex flex-col w-full col-span-2">
          <Label
            id="description"
            palceholder="description"
            label="description"
          />
          <textarea
            id="description"
            name="description"
            aria-required="true"
            placeholder="Enter Answer"
            className={cn("base-input resize-none flex-1", {
              "!border-red-500": !!errors?.description,
            })}
            rows={5}
            disabled={formValues.type == "view"}
            {...register("description", validationRules.required)}
          />
        </InputBox>
      </div>
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
