import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";
import Label from "../texts/Label";
import { useGetAllStandTypes } from "@/features/shelves/api/queries/useGetAllStandTypes";

export default function StandTypeDropdown({
  variant = "base",
  defaultText = "Select",
  isDisable,
  className,
  selected,
  setSelected,
  params = {
    setToUrl: false,
    isEnabled: false,
  },
}) {
  console.log("🚀 ~ selected:", selected);
  const { data, isLoading, isFetching, setParams } = useGetAllStandTypes({
    setToUrl: params.setToUrl,
    isEnabled: params.isEnabled,
  });
  useEffect(
    (data) => {
      console.log("🚀 ~ useEffect ~ data:", data);
    },
    [data]
  );
  useEffect(() => {
    setParams({ brand_id: params.brand_id });
  }, [params.brand_id]);
  return (
    <div className="">
      <Label label="stand type" />

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data?.data || []}
        isDisable={isDisable}
        selected={selected}
        setSelected={(data) => setSelected(data)}
      />
    </div>
  );
}
