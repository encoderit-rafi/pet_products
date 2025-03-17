import React, { useEffect } from "react";
import BaseDropdown from "./BaseDropdown";
import Label from "../texts/Label";
import { useGetAllPlatform } from "@/api/marketing/platforms/useGetAllPlatform";

export default function PlatformsDropdown({
  variant = "base",
  defaultText = "Select Platform",
  className,
  selected,
  setSelected,
  hideLabel = false,
}) {
  const { data, isLoading, isFetching } = useGetAllPlatform({
    setToUrl: false,
    isEnabled: true,
    all: true,
  });
  useEffect(() => {
    console.log("🚀 ~ PlatformsDropdown data:", data);
  }, [data]);
  return (
    <div className="">
      {!hideLabel && <Label label="select Platform" />}

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
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
