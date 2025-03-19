import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";
import Label from "../texts/Label";
import { useGetAllPlatform } from "@/api/marketing/platforms/useGetAllPlatform";

export default function PlatformsDropdown({
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
  const { data, isLoading, isFetching, setParams } = useGetAllPlatform({
    setToUrl: false,
    isEnabled: true,
    all: true,
  });
  useEffect(() => {
    setParams({ category_id: params.category_id });
  }, [params.category_id]);
  return (
    <div className="">
      {!hideLabel && <Label label="Platform" />}

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        isDisable={isDisable}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data?.data || []}
        selected={selected}
        setSelected={(data) => setSelected(data)}
        field="platform"
      />
    </div>
  );
}
