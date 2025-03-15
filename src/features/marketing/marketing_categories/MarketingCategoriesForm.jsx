import { useCreateCategories } from "@/api/marketing/categories/useCreateCategories";
import { useGetAllCategories } from "@/api/marketing/categories/useGetAllCategories";
import { useUpdateCategories } from "@/api/marketing/categories/useUpdateCategories";
import BaseButton from "@/components/buttons/BaseButton";
import BaseInput from "@/components/inputs/BaseInput";

import { validationRules } from "@/consts";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function MarketingCategoriesForm({ formValues, onClose }) {
  const { refetch: fetchCategories } = useGetAllCategories({
    setToUrl: false,
    isEnabled: false,
  });
  const { mutate: createCategories, isLoading } = useCreateCategories();
  const { mutate: updateCategories, isLoading: isLoadingUpdate } =
    useUpdateCategories();
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
  function resetFields() {
    reset();
  }
  function handelClose() {
    resetFields();
    onClose();
  }
  useEffect(() => {
    if (formValues.type == "update") {
      setValue("name", formValues.data.name);
    }
  }, [formValues]);
  function onSubmit(item) {
    console.log("🚀 ~ onSubmit ~ item:", item);
    formValues.type == "create"
      ? createCategories(item, {
          onSuccess() {
            fetchCategories();
            handelClose();
          },
        })
      : updateCategories(
          { id: formValues.data.id, data: item },
          {
            onSuccess() {
              fetchCategories();
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
      <BaseInput
        id="name"
        label="name"
        palceholder="name"
        className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""}`}
        register={register("name", validationRules.required)}
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
