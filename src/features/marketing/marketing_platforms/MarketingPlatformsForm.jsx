import { useCreateCategories } from "@/api/marketing/categories/useCreateCategories";
import { useGetAllCategories } from "@/api/marketing/categories/useGetAllCategories";
import { useUpdateCategories } from "@/api/marketing/categories/useUpdateCategories";
import { useCreatePlatform } from "@/api/marketing/platforms/useCreatePlatform";
import { useGetAllPlatform } from "@/api/marketing/platforms/useGetAllPlatform";
import { useUpdatePlatform } from "@/api/marketing/platforms/useUpdatePlatform";
import BaseButton from "@/components/buttons/BaseButton";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import CategoriesDropdown from "@/components/dropdowns/CategoiresDropdown";
import BaseInput from "@/components/inputs/BaseInput";
import Label from "@/components/texts/Label";

import { validationRules } from "@/consts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const platforms = [
  { id: 1, name: "Facebook", value: "facebook" },
  { id: 2, name: "Instagram", value: "instagram" },
  { id: 3, name: "Twitter", value: "twitter" },
  { id: 4, name: "Linkedin", value: "linkedin" },
  { id: 5, name: "Website", value: "website" },
];
export default function MarketingPlatformsForm({ formValues, onClose }) {
  const { refetch: fetchPlatforms } = useGetAllPlatform({
    setToUrl: false,
    isEnabled: false,
  });
  const { mutate: createPlatform, isLoading } = useCreatePlatform();
  const { mutate: updatePlatform, isLoading: isLoadingUpdate } =
    useUpdatePlatform();
  const {
    register,
    formState,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
  } = useForm();

  const { errors } = formState;
  const [platform, setPlatform] = useState([]);
  const [categoryID, setCategoryID] = useState([]);
  function resetFields() {
    reset();
    setPlatform([]);
    setCategoryID([]);
  }
  function handelClose() {
    console.log("🚀 ~ handelClose ~ handelClose:");
    resetFields();
    onClose();
  }
  useEffect(() => {
    if (formValues.type == "update") {
      setPlatform(
        platforms.filter((item) => item.value == formValues.data.platform)
      );
      setCategoryID([formValues.data.marketing_category]);
    }
  }, [formValues]);
  function onSubmit(item) {
    console.log("🚀 ~ onSubmit ~ platform[0]:", platform[0]);
    console.log("🚀 ~ onSubmit ~ categoryID[0]:", categoryID[0]);
    if (platform.length == 0) {
      toast.error("Please Select a Platform");
      return;
    }
    if (categoryID.length == 0) {
      toast.error("Please Select a Platform");
      return;
    }
    console.log("🚀 ~ onSubmit ~ item:", item);
    formValues.type == "create"
      ? createPlatform(
          { platform: platform[0].value, category_id: categoryID[0].id },
          {
            onSuccess() {
              fetchPlatforms();
              handelClose();
            },
          }
        )
      : updatePlatform(
          {
            id: formValues.data.id,
            data: {
              platform: platform[0].value,
              category_id: categoryID[0].id,
            },
          },
          {
            onSuccess() {
              fetchPlatforms();
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
      {/* <BaseInput
        id="platform"
        label="platform"
        palceholder="platform"
        className={`py-3 rounded-lg ${
          errors?.platform ? "!border-red-500" : ""
        }`}
        register={register("platform", validationRules.required)}
      /> */}
      <div className="">
        <Label label="Select Platform" />

        <BaseDropdown
          variant={"base"}
          defaultText="Select Platform"
          // className={`w-full ${className}`}
          // isLoading={isLoading || isFetching}
          // 'instagram', 'twitter', 'linkedin', 'website'
          options={platforms}
          selected={platform}
          setSelected={(data) => setPlatform([data])}
        />
      </div>
      <CategoriesDropdown
        selected={categoryID}
        setSelected={(item) => setCategoryID([item])}
      />
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
