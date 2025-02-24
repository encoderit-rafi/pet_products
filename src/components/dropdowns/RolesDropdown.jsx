import { useGetAllRoles } from "@/api/roles/useGetAllRoles";
import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";

export default function RolesDropdown({
  variant = "base",
  defaultText = "Select Role",
  className,
  isDisable,
  selected,
  setSelected,
  params = {
    setToUrl: false,
    isEnabled: true,
  },
}) {
  const { data, isLoading, isFetching, setParams } = useGetAllRoles();
  useEffect(() => {
    setParams({
      brand_ids: params.brand_ids,
      connect_role: params.connect_role,
    });
  }, [params.brand_ids, params.connect_role]);
  return (
    <BaseDropdown
      variant={variant}
      defaultText={defaultText}
      className={`w-full ${className}`}
      isLoading={isLoading || isFetching}
      options={data?.data || []}
      selected={selected}
      setSelected={(data) => setSelected(data)}
      isDisable={isDisable}
      field="name"
    />
  );
}
