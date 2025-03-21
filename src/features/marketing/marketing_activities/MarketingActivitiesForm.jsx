import React, { useEffect, useState } from "react";
import BaseButton from "@/components/buttons/BaseButton";
import BrandsDropdown from "@/components/dropdowns/BrandsDropdown";

import ImagePicker from "@/components/file_pickers/ImagePicker";
import BaseInput from "@/components/inputs/BaseInput";

import { omitEmpty, validationRules } from "@/consts";
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
import ImagePreview from "@/components/file_pickers/ImagePreview";
import ProductsDropdown from "@/components/dropdowns/ProductsDropdown";
import BrandList from "@/components/BrandList";
import ProductCombobox from "@/components/ combo_boxes/ProductCombobox";
import ClientCombobox from "@/components/ combo_boxes/ClientCombobox";
// import { useCreateStand } from "../api/mutations/useCreateStand";
// import { useGetAllShelves } from "../api/queries/useGetAllShelves";

export default function MarketingActivitiesForm({ formValues, onClose }) {
  // console.log("🚀 ~ MarketingActivitiesForm ~ formValues:", formValues);
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
  const [selectNewImages, setSelectNewImages] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedStore, setSelectedStore] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedStandType, setSelectedStandType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  useEffect(() => {
    const fieldsToUpdate = [
      { key: "attachments", value: images },
      { key: "date", value: date },
      { key: "brand_id", value: selectedBrand[0]?.id },
      { key: "client_id", value: selectedStore[0]?.id },
      { key: "platform_id", value: selectedPlatform[0]?.id },
      { key: "category_id", value: selectedCategory[0]?.id },
      { key: "stand_id", value: selectedStandType[0]?.id },
      { key: "product_ids", value: selectedProducts },
    ];

    fieldsToUpdate.forEach(({ key, value }) => {
      setValue(key, value);
      clearErrors(key);
    });
  }, [
    images,
    date,
    selectedBrand,
    selectedStore,
    selectedProducts,
    selectedPlatform,
    selectedCategory,
    selectedStandType,
  ]);
  function resetFields() {
    reset();
    setImages([]);
    setSelectedStore([]);
    setSelectedBrand([]);
    setSelectedPlatform([]);
    setSelectedCategory([]);
    setSelectedStandType([]);
    setSelectedProducts([]);
    setSelectNewImages(false);
  }
  useEffect(() => {
    if (formValues.type === "update") {
      const {
        brand,
        marketing_category,
        platform,
        stand,
        date,
        total,
        cost,
        channel,
        reach,
        description,
        client,
        products,
        // attachments
      } = formValues.data;
      setValue("date", date);
      setValue("total", total);
      setValue("cost", cost);
      setValue("channel", channel);
      setValue("reach", reach);
      setValue("description", description);
      // setImages(attachments);
      setSelectedBrand([brand]);
      setSelectedStore([client]);
      setSelectedCategory([marketing_category]);
      setSelectedPlatform([platform]);
      setSelectedStandType([stand]);
      setSelectedProducts(products.length > 0 ? products : []);
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
      (formValues.type == "create" ||
        (formValues.type == "update" && formValues.user.image == null) ||
        (formValues.type == "update" &&
          formValues.user.image != null &&
          selectNewImages)) && {
        key: "attachments",
        condition: (value) => value?.length === 0,
        message: "Select an image",
      },
      {
        key: "brand_id",
        condition: (value) => value === undefined,
        message: "Brand is required",
      },
      // {
      //   key: "platform_id",
      //   condition: (value) => value === undefined,
      //   message: "Platform  is required",
      // },

      {
        key: "client_id",
        condition: (value) => value === undefined,
        message: "Client  is required",
      },
      {
        key: "category_id",
        condition: (value) => value === undefined,
        message: "Category is required",
      },
      // {
      //   key: "stand_id",
      //   condition: (value) => value === undefined,
      //   message: "Stand is required",
      // },
    ].filter(Boolean);
    for (const { key, condition, message } of validations) {
      if (condition(item[key])) {
        toast.error(message);
        setError(key, { type: "manual", message });
        return;
      }
    }
    console.log("🚀 ~ onSubmit ~ selectedProducts:", selectedProducts);
    formValues.type == "create"
      ? createActivity(
          omitEmpty({
            ...item,
            product_ids:
              selectedProducts.length > 0
                ? selectedProducts
                    .filter((item) => !!item.id)
                    .map((item) => item.id)
                    .join(",")
                : [],
          }),
          {
            onSuccess() {
              fetchAllActivities();
              handelClose();
            },
            onError(error) {
              toast.error(error.response.data.message);
            },
          }
        )
      : updateActivity(
          {
            id: formValues.data.id,
            data: omitEmpty({
              ...item,
              product_ids:
                selectedProducts.length > 0
                  ? selectedProducts
                      .filter((item) => !!item.id)
                      .map((item) => item.id)
                      .join(",")
                  : [],
            }),
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
      {formValues.type === "update" &&
        // formValues?.data.image != null &&
        !selectNewImages &&
        formValues.data.attachments.length > 0 &&
        formValues.data.attachments.map((attachment) => (
          <ImagePreview
            className={"size-32"}
            // attachments={formValues.data.attachments}
            src={attachment.url}
            onClickClose={() => setSelectNewImages(true)}
          />
        ))}
      {(formValues.type === "create" ||
        selectNewImages ||
        (formValues.type === "update" &&
          formValues.data.attachments.length == 0)) && (
        <ImagePicker
          className={"size-32"}
          images={images}
          setImages={setImages}
          isError={errors?.attachments?.message}
          title="Upload Files"
          // subTitle="JPG, JPEG, PNG, PDF, EXCEL"
          // accept=".xlsx, .xls, application/pdf, image/jpeg, image/png"
          multiple
        />
      )}
      <div className="grid grid-cols-2 gap-2 items-start">
        <BrandsDropdown
          required
          selected={selectedBrand}
          setSelected={(data) => {
            data?.id != selectedBrand?.[0]?.id && setSelectedBrand([data]);
          }}
        />
        {/* <BrandList /> */}
        {/* <StoresDropdown
          required
          defaultText="Select"
          selected={selectedStore}
          setSelected={(data) => {
            data?.id != selectedStore?.[0]?.id && setSelectedStore([data]);
          }}
        /> */}
        <ClientCombobox
          required
          searchable
          defaultText="Select"
          selected={selectedStore}
          setSelected={(data) => {
            data?.id != selectedStore?.[0]?.id && setSelectedStore([data]);
          }}
        />
        <ProductCombobox
          // required
          multiple
          searchable
          disabled={selectedBrand?.length == 0 ? true : false}
          params={{ brand_id: selectedBrand?.[0]?.id }}
          selected={selectedProducts}
          setSelected={(data) => {
            setSelectedProducts((old) =>
              selectedProducts?.some((item) => item.id == data.id)
                ? old.filter((item) => item.id != data.id)
                : [...selectedProducts, data]
            );
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
        <CategoriesDropdown
          required
          isDisable={selectedBrand?.length == 0 ? true : false}
          params={{ brand_id: selectedBrand?.[0]?.id }}
          selected={selectedCategory}
          setSelected={(data) => {
            data?.id != selectedCategory?.[0]?.id &&
              setSelectedCategory([data]);
          }}
        />
        <PlatformsDropdown
          isDisable={selectedCategory?.length == 0 ? true : false}
          params={{ category_id: selectedCategory?.[0]?.id }}
          selected={selectedPlatform}
          setSelected={(data) => {
            data?.id != selectedPlatform?.[0]?.id &&
              setSelectedPlatform([data]);
          }}
          className={"col-span-2 bg-slate-500 w-full"}
        />

        <BaseInput
          id="channel"
          label="channel"
          palceholder="Enter channel"
          className={`py-3 rounded-lg ${
            errors?.channel ? "!border-red-500" : ""
          }`}
          // register={register("channel", validationRules.required)}
          register={register("channel")}
        />

        <BaseInput
          id="reach"
          label="reach"
          palceholder="Value"
          type="number"
          className={`py-3 rounded-lg ${
            errors?.reach ? "!border-red-500" : ""
          }`}
          // register={register("reach", validationRules.required)}
          register={register("reach")}
        />
        <BaseDatePicker
          date={date}
          setDate={(date) => setDate(date)}
          required
        />

        <BaseInput
          required
          id="cost"
          label="cost"
          palceholder="Value"
          type="number"
          className={`py-3 rounded-lg ${errors?.cost ? "!border-red-500" : ""}`}
          register={register("cost", validationRules.required)}
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
            placeholder="Enter description"
            className={cn("base-input resize-none flex-1", {
              "!border-red-500": !!errors?.description,
            })}
            rows={5}
            disabled={formValues.type == "view"}
            {...register("description")}
          />
        </InputBox>
      </div>
      <div className="flex items-center gap-4">
        <BaseButton
          onClick={handelClose}
          isDisabled={isLoading || isLoadingUpdate}
        >
          cancel
        </BaseButton>
        <BaseButton
          isDisabled={isLoading || isLoadingUpdate}
          isLoading={isLoading || isLoadingUpdate}
          variant="gradient"
          type="submit"
        >
          confirm
        </BaseButton>
      </div>
    </form>
  );
}
