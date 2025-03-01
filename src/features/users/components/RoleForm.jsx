import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { omitEmpty, validationRules } from "@/consts";

import Label from "@/components/texts/Label";
import BaseInput from "@/components/inputs/BaseInput";
import BaseButton from "@/components/buttons/BaseButton";

import { useGetAllPermissions } from "@/api/permissions/useGetAllPermissions";
import { useCreateRole } from "@/api/roles/useCreateRole";
import { useUpdateRole } from "@/api/roles/useUpdateRole";
import { useGetAllRoles } from "@/api/roles/useGetAllRoles";

export default function RoleForm({ handelOnClickCancel, formValues }) {
  const [selectedPermissionsID, setSelectedPermissionsID] = useState([]);
  useEffect(() => {
    setValue("permissions", selectedPermissionsID);
  }, [selectedPermissionsID]);
  const { data: permissions } = useGetAllPermissions();

  const {
    mutate: createRole,
    isLoading: isLoadingCreateRole,
    isError: isErrorCreateRole,
  } = useCreateRole();
  const {
    mutate: updateRole,
    isLoading: isLoadingUpdateRole,
    isError: isErrorUpdateRole,
  } = useUpdateRole();

  const {
    register,
    formState,
    handleSubmit,
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm();
  const { refetch: fetchAllRoles } = useGetAllRoles({ isEnabled: true });
  const { errors } = formState;
  useEffect(() => {
    if (formValues.type != "create") {
      const { name, permissions } = formValues.role;
      console.log("🚀 ~ useEffect ~ permissions:", permissions);
      setValue("name", name);
      setSelectedPermissionsID(permissions.map((permission) => permission.id));
    } else {
      resetFields();
    }
  }, [formValues]);

  function resetFields() {
    reset();
    setSelectedPermissionsID([]);
  }
  function onSubmit(data) {
    formValues.type === "update"
      ? updateRole(
          {
            id: formValues.role.id,
            data,
          },
          {
            onSuccess: () => {
              resetFields();
              fetchAllRoles();
              handelOnClickCancel();
            },
            onError: () => {},
          }
        )
      : createRole(data, {
          onSuccess: () => {
            resetFields();
            fetchAllRoles();
            handelOnClickCancel();
          },
        });
  }

  const togglePermission = (permission) => {
    setSelectedPermissionsID((prev) => {
      if (prev.some((item) => item == permission.id)) {
        return prev.filter((item) => item != permission.id);
      } else {
        return [...prev, permission.id];
      }
    });
  };
  return (
    <form
      className="flex flex-col mt-4 space-y-4 overflow-y-auto max-h-[680px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <BaseInput
        id="name"
        type="text"
        label="name"
        palceholder="Enter Value"
        className={`py-3 rounded-lg ${errors?.name ? "!border-red-500" : ""}`}
        register={register("name", validationRules.name)}
        disabled={formValues.type == "view"}
      />
      <Label label="Permissions" />

      <div className="grid grid-cols-2 gap-1 h-52 overflow-x-hidden overflow-y-auto">
        {formValues.type != "view" &&
          permissions?.data?.length > 0 &&
          permissions?.data.map((permission) => (
            <label key={permission.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-lime-500  size-4 bg-gray-600"
                checked={selectedPermissionsID.some(
                  (item) => item == permission.id
                )}
                onChange={() => togglePermission(permission)}
              />
              <span className="text-custom_text_one capitalize">
                {permission.name.split("_").join(" ")}
              </span>
            </label>
          ))}
        {formValues.type == "view" &&
          permissions?.data?.length > 0 &&
          permissions?.data
            ?.filter((permission) =>
              selectedPermissionsID.some((item) => item == permission.id)
            )
            .map((permission) => (
              <label
                key={permission.id}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  className="accent-lime-500 disabled:accent-lime-500  size-4 bg-gray-600"
                  checked
                  disabled
                />
                <span className="text-custom_text_one capitalize">
                  {permission.name.split("_").join(" ")}
                </span>
              </label>
            ))}
      </div>
      <div className="flex items-center gap-4">
        <BaseButton
          onClick={() => {
            resetFields();
            handelOnClickCancel();
          }}
          isDisabled={
            formValues.type == "create"
              ? isLoadingCreateRole && !isErrorCreateRole
              : isErrorCreateRole && !isErrorUpdateRole
          }
        >
          cancel
        </BaseButton>
        {formValues.type != "view" && (
          <BaseButton
            variant="gradient"
            type="submit"
            isLoading={
              formValues.type == "create"
                ? isLoadingCreateRole && !isErrorCreateRole
                : isLoadingUpdateRole && !isErrorUpdateRole
            }
            isDisabled={
              formValues.type == "create"
                ? isLoadingCreateRole && !isErrorCreateRole
                : isErrorUpdateRole && !isErrorUpdateRole
            }
          >
            confirm
          </BaseButton>
        )}
      </div>
    </form>
  );
}
