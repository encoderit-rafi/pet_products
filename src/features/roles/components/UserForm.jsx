import React from "react";
import { useEffect, useState } from "react";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import Label from "@/components/texts/Label";
// import BaseSelectDropdown from "@/components/dropdowns/BaseSelectDropdown";
// import InputText from "@/components/inputs/InputText";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber";
import BaseInput from "@/components/inputs/BaseInput";
import { useForm } from "react-hook-form";
import MultiSelectListbox from "@/components/dropdowns/MultiSelectListbox";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useGetAllRoles } from "@/api/roles/queries/useGetAllRoles";
import { validationRules } from "@/consts";
import { useCreateUserMutation } from "../api/mutations/useCreateUserMutation";
import BaseButton from "@/components/buttons/BaseButton";
import InputBox from "@/components/box/InputBox";
import { useGetAllUsers } from "../api/queries/useGetAllUsers";
import ImagePreview from "@/components/file_pickers/ImagePreview";
export default function UserForm({ handelOnClickCancel, data = { form_type: 'create' } }) {
  console.log({ data })
  const { refetch: refetchAllUsers } = useGetAllUsers({ setToUrl: false, isEnabled: false });
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm();
  const { data: getAllRoles } = useGetAllRoles();
  const { data: getAllBrands } = useGetAllBrands();
  const { mutate: createUser, isLoading: isLoadingCreateUser } =
    useCreateUserMutation();

  const [images, setImages] = useState([]);
  const [number, setNumber] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const { errors } = formState;
  console.log({ errors });
  useEffect(() => {
    console.log({ images })

  }, [images]);
  useEffect(() => {
    if (data.form_type === 'update') {
      const { name, email, phone_number, profile_image, brands, roles } = data;
      // setImages([profile_image]);
      setValue('name', name);
      setValue('email', email);
      setNumber(phone_number);
      // setSelectedBrands(brands);
      // setSelectedRoles(roles);
    }

  }, []);
  useEffect(() => {
    const fieldsToUpdate = [
      { key: "profile_image", value: images },
      { key: "phone_number", value: number },
      { key: "brand_ids", value: selectedBrands.map((item) => item.id) },
      { key: "role_ids", value: selectedRoles.map((item) => item.id) },
    ];

    fieldsToUpdate.forEach(({ key, value }) => {
      setValue(key, value);
      clearErrors(key);
    });
  }, [images, number, selectedBrands, selectedRoles]);
  function resetFields() {
    reset();
    setImages([]);
    setNumber("");
    setSelectedRoles([]);
    setSelectedBrands([]);
  }
  function onSubmit(data) {
    const validations = [
      {
        key: "profile_image",
        condition: (value) => value.length === 0,
        message: "Select an image",
      },
      {
        key: "phone_number",
        condition: (value) => value.length <= 3,
        message: "Phone number is required",
      },
      {
        key: "brand_ids",
        condition: (value) => value.length === 0,
        message: "Select a brand",
      },
      {
        key: "role_ids",
        condition: (value) => value.length === 0,
        message: "Select a role",
      },
    ];

    for (const { key, condition, message } of validations) {
      if (condition(data[key])) {
        setError(key, { type: "manual", message });
        return;
      }
    }

    createUser(
      {
        ...data,
        profile_image: data.profile_image[0],
        is_brand_employee: 0,
      },
      {
        onSuccess: () => {
          refetchAllUsers();
          resetFields();
          handelOnClickCancel();
        },
      }
    );
  }
  return (
    <form
      className="flex flex-col mt-4 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {data.form_type === 'update' && data.image != null &&

        <ImagePreview sre={data.image.url} />
        // data.image.url
      }
      {
        (data.form_type === 'create' || (data.form_type === 'update' && data.image == null)) &&

        <ImagePicker images={images} setImages={setImages} />
      }

      {/* <ImagePicker /> */}
      <div className="space-y-4 overflow-auto max-h-32 lg:max-h-72">
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
          className={`py-3 rounded-lg ${errors?.email ? "!border-red-500" : ""
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
        <InputBox>
          <Label id="brands" label="brands" palceholder="brands " />
          <MultiSelectListbox
            options={getAllBrands || []}
            className={errors?.brand_ids && "!border-red-500"}
            selectedOptions={selectedBrands}
            setSelectedOptions={setSelectedBrands}
          />
        </InputBox>
        <InputBox>
          <Label id="roles" label="roles" palceholder="roles " />
          <MultiSelectListbox
            options={getAllRoles || []}
            className={errors?.role_ids && "!border-red-500"}
            selectedOptions={selectedRoles}
            setSelectedOptions={setSelectedRoles}
          />
        </InputBox>
      </div>
      <div className="flex items-center gap-4">
        <BaseButton
          onClick={() => {
            resetFields();
            handelOnClickCancel();
          }}
          isDisabled={isLoadingCreateUser}
        >
          cancel
        </BaseButton>
        <BaseButton
          variant="gradient"
          type="submit"
          isLoading={isLoadingCreateUser}
          isDisabled={isLoadingCreateUser}
        >
          confirm
        </BaseButton>
      </div>
    </form>
  );
}
