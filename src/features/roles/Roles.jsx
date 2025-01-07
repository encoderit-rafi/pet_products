import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";

import BorderBox from "@/components/box/BorderBox";
import Title from "@/components/texts/Title";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import Label from "@/components/texts/Label";
import BaseSelectDropdown from "@/components/dropdowns/BaseSelectDropdown";
import InputText from "@/components/inputs/InputText";
import BaseButton from "@/components/buttons/BaseButton";
import { useEffect, useState } from "react";
import Dialog from "@/components/dialogs/Dialog";
import InputPhoneNumber from "@/components/inputs/InputPhoneNumber";
import BaseInput from "@/components/inputs/BaseInput";
import IconButton from "@/components/buttons/IconButton";
import { useForm } from "react-hook-form";
import MultiSelectListbox from "@/components/dropdowns/MultiSelectListbox";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useGetAllRoles } from "@/api/roles/queries/useGetAllRoles";
import { validationRules } from "@/consts";

export default function Roles() {
  const { data: getAllBrands } = useGetAllBrands();
  const { data: getAllRoles } = useGetAllRoles();
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm();
  const { errors } = formState;
  console.log({ errors })
  const [isOpenAddNewUser, setIsOpenAddNewUser] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [images, setImages] = useState([]);
  const [number, setNumber] = useState("");

  useEffect(() => {
    setValue(
      "profile_image",
      images[0]
    );
    clearErrors("profile_image");
  }, [images]);
  useEffect(() => {
    setValue(
      "phone_number",
      number
    );
    clearErrors("phone_number");
  }, [number]);
  useEffect(() => {
    setValue(
      "brand_id",
      selectedBrands.map((item) => item.id)
    );
    clearErrors("brand_id");
  }, [selectedBrands]);
  useEffect(() => {
    setValue(
      "role_id",
      selectedRoles.map((item) => item.id)
    );
    clearErrors("role_id");
  }, [selectedRoles]);
  function onSubmit(data) {
    if (data.role_id.length == 0) {
      setError("phone_number", {
        type: "manual",
        message: "Phone number is required",
      });
      return;
    }
    if (data.profile_image.length == 0) {
      setError("profile_image", {
        type: "manual",
        message: "Select an image",
      });
      return;
    }
    if (data.brand_id.length == 0) {
      setError("brand_id", {
        type: "manual",
        message: "Select a brand",
      });
      return;
    }
    if (data.role_id.length == 0) {
      setError("role_id", {
        type: "manual",
        message: "Select a role",
      });
      return;
    }


    console.log("✅ ~ file: Roles.jsx:30 ~ onSubmit ~ data:", data);
  }
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <Title> Assigned Roles</Title>

        <div className="flex items-center gap-4">
          <BaseButton
            variant="orange"
            icon="plus"
            className="px-3 text-xs max-w-fit lg:px-5"
            onClick={() => setIsOpenAddNewUser(true)}
          >
            <span className="hidden lg:block">add new</span>
          </BaseButton>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2 md:grid-cols-3">
        <BorderBox className="p-2 lg:p-2 !border-custom_line_eight">
          <div className="flex items-center gap-2">
            <div className="p-1 size-14 bg-custom_bg_two rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 capitalize">
              <p className="text-sm font-normal text-custom_text_four">
                m. khalid saied
              </p>
              <p className="text-xs text-custom_text_five font-extralight">
                role here
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-custom_yellow">
              <IconButton>
                <EditIcon className="size-4" />
              </IconButton>
              <IconButton>
                <DeleteIcon className="size-4" />
              </IconButton>
            </div>
          </div>
        </BorderBox>
      </div>
      <Dialog
        isOpen={isOpenAddNewUser}
        title="add new user"
        className="max-w-lg "
      >
        <form
          className="flex flex-col mt-4 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ImagePicker
            images={images}
            setImages={setImages}
          />
          <div className="space-y-4 overflow-auto max-h-32 lg:max-h-72">
            <BaseInput
              id="name"
              type="text"
              label="name"
              palceholder="name"
              className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""
                }`}
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

            <div className="space-y-2">
              <Label
                id="phone_number"
                label="phone number"
                palceholder="phone number"
              />
              <InputPhoneNumber
                number={number} setNumber={setNumber}
                isError={errors.phone_number}
              />
            </div>
            <div className="space-y-2">
              <Label id="brands" label="brands" palceholder="brands " />
              <MultiSelectListbox
                options={getAllBrands || []}
                className={errors?.brand_id && "!border-red-500"}
                selectedOptions={selectedBrands}
                setSelectedOptions={setSelectedBrands}
              />
            </div>
            <div className="space-y-2">
              <Label id="roles" label="roles" palceholder="roles " />
              <MultiSelectListbox
                options={getAllRoles || []}
                className={errors?.role_id && "!border-red-500"}
                selectedOptions={selectedRoles}
                setSelectedOptions={setSelectedRoles}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BaseButton
              onClick={() => {
                reset();
                setIsOpenAddNewUser(false);
              }}
            >
              cancel
            </BaseButton>
            <BaseButton variant="gradient" type="submit">
              confirm
            </BaseButton>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
