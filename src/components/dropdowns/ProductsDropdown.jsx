import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";
import { useGetAllProducts } from "@/features/products/api/queries/useGetAllProducts";
import Label from "../texts/Label";

export default function ProductsDropdown({
  variant = "base",
  defaultText = "Select Products",
  className,
  multiple,
  isDisable,
  selected,
  setSelected,
  params = {
    setToUrl: false,
    isEnabled: true,
  },
}) {
  const { data, isLoading, isFetching, setParams } = useGetAllProducts({
    setToUrl: params.setToUrl,
    isEnabled: params.isEnabled,
  });
  useEffect(() => {
    setParams({ brand_id: params.brand_id });
  }, [params.brand_id]);
  return (
    <div className="">
      <Label label={defaultText} />

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data?.data || []}
        selected={selected}
        setSelected={(data) => setSelected(data)}
        isDisable={isDisable}
        multiple={multiple}
        field="product_name_en"
      />
    </div>
  );
}
