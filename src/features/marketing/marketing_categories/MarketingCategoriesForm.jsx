import BaseButton from "@/components/buttons/BaseButton";
import BaseInput from "@/components/inputs/BaseInput";

import { validationRules } from "@/consts";
import { useForm } from "react-hook-form";

export default function MarketingCategoriesForm({ onClose }) {
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
  function resetFields() {
    reset();
  }
  function handelClose() {
    // resetFields();
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
