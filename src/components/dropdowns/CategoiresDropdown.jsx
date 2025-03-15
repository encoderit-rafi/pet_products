import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";
import Label from "../texts/Label";
import { useGetAllCategories } from "@/api/marketing/categories/useGetAllCategories";

export default function CategoriesDropdown({
  variant = "base",
  defaultText = "Select Category",
  className,
  selected,
  setSelected,
  hideLabel = false,
}) {
  const { data, isLoading, isFetching } = useGetAllCategories({
    setToUrl: false,
    isEnabled: true,
    all: true,
  });
  useEffect(() => {
    console.log("🚀 ~ data:", data);
  }, [data]);
  return (
    <div className="">
      {!hideLabel && <Label label="select Category" />}

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data?.data || []}
        selected={selected}
        setSelected={(data) => setSelected(data)}
      />
    </div>
  );
}
