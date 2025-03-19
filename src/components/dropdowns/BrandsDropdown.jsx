import React from "react";
import BaseDropdown from "./BaseDropdown";
import { useGetAllBrands } from "@/api/brands/useGetAllBrands";
import Label from "../texts/Label";

export default function BrandsDropdown({
  variant = "base",
  defaultText = "Select Brand",
  className,
  required,
  selected,
  setSelected,
  hideLabel = false,
}) {
  const { data, isLoading, isFetching } = useGetAllBrands();
  return (
    <div className="">
      {!hideLabel && <Label label="Brand" required={required} />}

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data || []}
        selected={selected}
        setSelected={(data) => setSelected(data)}
      />
    </div>
  );
}
