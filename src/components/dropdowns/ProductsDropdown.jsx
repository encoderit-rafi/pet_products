import React, { useEffect } from "react";
import Label from "../texts/Label";
import BaseDropdown from "./BaseDropdown";
import { useGetAllProducts } from "@/features/products/api/queries/useGetAllProducts";

export default function ProductsDropdown({
  variant = "base",
  defaultText = "Select Products",
  className,
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
      {/* <Label label="Products list" /> */}

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data?.data || []}
        selected={selected}
        setSelected={(data) => setSelected(data)}
        isDisable={isDisable}
        field="product_name_en"
      />
    </div>
  );
}
