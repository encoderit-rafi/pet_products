import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";
import Label from "../texts/Label";
import { useGetAllStores } from "@/api/stores/queries/useGetAllStores";

export default function StoresDropdown({
  variant = "base",
  defaultText = "Select",
  className,
  selected,
  setSelected,
}) {
  const { data, isLoading, isFetching } = useGetAllStores();
  useEffect(() => {
    console.log("✅ ~ Stores:", data);
  }, [data]);
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
