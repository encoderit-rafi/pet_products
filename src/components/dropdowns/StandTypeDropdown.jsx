import React from "react";
import BaseDropdown from "./BaseDropdown";
import Label from "../texts/Label";
import { useGetAllStandTypes } from "@/features/shelves/api/queries/useGetAllStandTypes";

export default function StandTypeDropdown({
  variant = "base",
  defaultText = "Select Stand Type",
  className,
  selected,
  setSelected,
}) {
  const { data, isLoading, isFetching } = useGetAllStandTypes({
    setToUrl: false,
  });

  return (
    <div className="">
      <Label label="select stand type" />

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
