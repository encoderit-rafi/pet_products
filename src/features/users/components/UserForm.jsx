import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { omitEmpty, validationRules } from "@/consts";

import Label from "@/components/texts/Label";
import InputBox from "@/components/box/InputBox";
import BaseInput from "@/components/inputs/BaseInput";
import SelectionBox from "@/components/ui/SelectionBox";
import BaseButton from "@/components/buttons/BaseButton";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import ImagePreview from "@/components/file_pickers/ImagePreview";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber";

import { useCreateUser } from "@/api/users/useCreateUser";
import { useUpdateUser } from "@/api/users/useUpdateUser";
import { useGetAllUsers } from "@/api/users/useGetAllUsers";
import { useGetAllRoles } from "@/api/roles/useGetAllRoles";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import RolesDropdown from "@/components/dropdowns/RolesDropdown";
import toast from "react-hot-toast";

export default function UserForm({ handelOnClickCancel, formValues }) {
  const {
    refetch: fetchAllUsers,
    params,
    setParams,
  } = useGetAllUsers({
    setToUrl: false,
    isEnabled: false,
  });
  const {
    mutate: createUser,
    isLoading: isLoadingCreateUser,
    isError: isErrorCreateUser,
  } = useCreateUser();
  const {
    mutate: updateUser,
    isLoading: isLoadingUpdateUser,
    isError: isErrorUpdateUser,
  } = useUpdateUser();

  const { data: allBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const {
    data: allRoles,
    refetch: fetchAllRoles,
    params: paramsAllRoles,
    setParams: setParamsAllRoles,
  } = useGetAllRoles();

  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm();

  const [images, setImages] = useState([]);
  const [selectNewImages, setSelectNewImages] = useState(false);
  const [number, setNumber] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const { errors } = formState;
  useEffect(() => {
    if (formValues.type === "update") {
      const { name, email, phone_number, brands, roles } = formValues.user;
      setValue("name", name);
      setValue("email", email);
      setValue("password", password);
      setSelectedBrands(brands);
      setSelectedRoles(roles);
      setNumber(phone_number);
      // setImages([profile_image]);
    } else {
      resetFields();
    }
  }, [formValues]);
  useEffect(() => {
    setParamsAllRoles({
      brand_ids: selectedBrands?.map((item) => item.id).join(","),
    });
  }, [selectedBrands]);
  useEffect(() => {
    fetchAllRoles();
  }, [paramsAllRoles]);
  useEffect(() => {
    const fieldsToUpdate = [
      { key: "profile_image", value: images },
      { key: "phone_number", value: number },
      { key: "brand_ids", value: selectedBrands?.map((item) => item.id) },
      { key: "role_ids", value: selectedRoles?.map((item) => item.id) },
    ];

    fieldsToUpdate.forEach(({ key, value }) => {
      setValue(key, value);
      clearErrors(key);
    });
  }, [images, number, selectedBrands, selectedRoles]);

  function resetFields() {
    console.log("🚀 ~ resetFields ~ resetFields");
    reset();
    setImages([]);
    setNumber("");
    setSelectedRoles([]);
    setSelectedBrands([]);
    setSelectNewImages(false);
  }
  function onSubmit(data) {
    const validations = [
      // (formValues.type == "create" ||
      //   (formValues.type == "update" && formValues.user.image == null) ||
      //   (formValues.type == "update" &&
      //     formValues.user.image != null &&
      //     selectNewImages)) && {
      //   key: "profile_image",
      //   condition: (value) => value?.length === 0,
      //   message: "Select an image",
      // },
      {
        key: "phone_number",
        condition: (value) => value?.length <= 3,
        message: "Phone number is required",
      },
      // {
      //   key: "brand_ids",
      //   condition: (value) => value.length === 0,
      //   message: "Select a brand",
      // },
      {
        key: "role_ids",
        condition: (value) => value.length === 0,
        message: "Select a role",
      },
    ].filter(Boolean);
    for (const { key, condition, message } of validations) {
      if (condition(data[key])) {
        setError(key, { type: "manual", message });
        toast.error(message);
        return;
      }
    }
    formValues.type === "update"
      ? updateUser(
          {
            id: formValues.user.id,
            data: omitEmpty({
              ...data,
              profile_image: data.profile_image[0],
              is_brand_employee: 1,
            }),
          },
          {
            onSuccess: () => {
              resetFields();
              console.log("update");
              setParams({ page: params.page, per_page: params.per_page });
              fetchAllUsers();
              handelOnClickCancel();
            },
          }
        )
      : createUser(
          {
            ...data,
            profile_image: data.profile_image[0],
            is_brand_employee: 1,
          },
          {
            onSuccess: () => {
              resetFields();
              // fetchAllUsers();
              setParams({ page: params.page, per_page: params.per_page });
              fetchAllUsers();
              handelOnClickCancel();
            },
          }
        );
  }
  return (
    <form
      className="flex flex-col mt-4 space-y-4 overflow-y-auto max-h-[680px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formValues.type === "update" &&
        formValues?.user.image != null &&
        !selectNewImages && (
          <ImagePreview
            className={"size-32"}
            src={formValues.user.image.url}
            onClickClose={() => setSelectNewImages(true)}
          />
        )}
      {(formValues.type === "create" ||
        selectNewImages ||
        (formValues.type === "update" && formValues?.user.image == null)) && (
        <ImagePicker
          className={"size-32"}
          images={images}
          setImages={setImages}
          isError={errors?.profile_image?.message}
        />
      )}

      {/* <ImagePicker /> */}
      <div className="space-y-3 overflow-auto">
        <BaseInput
          id="name"
          type="text"
          label="name"
          palceholder="name"
          className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""}`}
          register={register("name", validationRules.name)}
        />
        <BaseInput
          id="email"
          type="email"
          label="email"
          palceholder="email"
          className={`py-3 rounded-lg ${
            errors?.email ? "!border-red-500" : ""
          }`}
          register={register("email", validationRules.email)}
        />
        <InputBox>
          <Label
            id="phone_number"
            label="phone number"
            palceholder="phone number"
          />
          <InputPhoneNumber
            number={number}
            setNumber={setNumber}
            isError={errors.phone_number}
          />
        </InputBox>
        <BaseInput
          id="password"
          type="password"
          label="password"
          palceholder="password"
          className={`py-3 rounded-lg ${
            errors?.password ? "!border-red-500" : ""
          }`}
          register={register("password", validationRules.password)}
        />
        <InputBox>
          <Label id="brands" label="brands" palceholder="brands " />
          <BaseDropdown
            multiple
            variant="base"
            defaultText="Select Brands"
            isLoading={isLoadingAllBrands}
            className={"w-full"}
            options={allBrands || []}
            selected={selectedBrands}
            setSelected={(data) => {
              setSelectedBrands((old) => {
                return old?.some((val) => val?.id == data?.id)
                  ? old.filter((val) => val.id != data.id)
                  : [...old, data];
              });
            }}
          />
        </InputBox>
        {selectedBrands.length > 0 && (
          <SelectionBox
            data={selectedBrands}
            onClickClose={(data) => {
              setSelectedBrands((old) => {
                return old?.some((val) => val?.id == data?.id)
                  ? old.filter((val) => val.id != data.id)
                  : [...old, data];
              });
            }}
          />
        )}
        <InputBox>
          <Label id="roles" label="roles" palceholder="roles " />

          <RolesDropdown
            params={{
              brand_ids: selectedBrands?.map((item) => item.id).join(","),
            }}
            selected={selectedRoles}
            setSelected={(data) => {
              setSelectedRoles((old) => {
                return old?.some((val) => val?.id == data?.id)
                  ? old.filter((val) => val.id != data.id)
                  : [...old, data];
              });
            }}
          />
        </InputBox>
        {selectedRoles.length > 0 && (
          <SelectionBox
            data={selectedRoles}
            onClickClose={(data) => {
              setSelectedRoles((old) => {
                return old?.some((val) => val?.id == data?.id)
                  ? old.filter((val) => val.id != data.id)
                  : [...old, data];
              });
            }}
          />
        )}
      </div>
      <div className="flex items-center gap-4">
        <BaseButton
          onClick={() => {
            resetFields();
            handelOnClickCancel();
          }}
          isDisabled={
            formValues.type == "create"
              ? isLoadingCreateUser && !isErrorCreateUser
              : isLoadingUpdateUser && !isErrorUpdateUser
          }
        >
          cancel
        </BaseButton>
        <BaseButton
          variant="gradient"
          type="submit"
          isLoading={
            formValues.type == "create"
              ? isLoadingCreateUser && !isErrorCreateUser
              : isLoadingUpdateUser && !isErrorUpdateUser
          }
          isDisabled={
            formValues.type == "create"
              ? isLoadingCreateUser && !isErrorCreateUser
              : isLoadingUpdateUser && !isErrorUpdateUser
          }
        >
          confirm
        </BaseButton>
      </div>
    </form>
  );
}
