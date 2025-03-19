import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";
import Label from "../texts/Label";
import { useGetAllCategories } from "@/api/marketing/categories/useGetAllCategories";

export default function CategoriesDropdown({
  variant = "base",
  defaultText = "Select",
  className,
  selected,
  setSelected,
  hideLabel = false,
  isDisable,
  params = {
    setToUrl: false,
    isEnabled: false,
    all: true,
  },
}) {
  const { data, isLoading, isFetching, setParams } = useGetAllCategories({
    setToUrl: params.setToUrl,
    isEnabled: params.isEnabled,
    all: params.all,
  });
  useEffect(() => {
    console.log("🚀 ~ data:", data);
  }, [data]);
  useEffect(() => {
    setParams({ brand_id: params.brand_id });
  }, [params.brand_id]);
  return (
    <div className="">
      {!hideLabel && <Label label="Category" />}

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        isDisable={isDisable}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data?.data || []}
        selected={selected}
        setSelected={(data) => setSelected(data)}
      />
    </div>
  );
}
