import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";
import Label from "../texts/Label";
import { useGetAllStores } from "@/api/stores/useGetAllStores";

export default function StoresDropdown({
  variant = "base",
  defaultText = "Select",
  className,
  selected,
  setSelected,
}) {
  const { data, isLoading, isFetching } = useGetAllStores();

  return (
    <div className="">
      <Label label="stores" />

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data?.data || []}
        selected={selected}
        setSelected={(data) => setSelected(data)}
        field="name_en"
      />
    </div>
  );
}
