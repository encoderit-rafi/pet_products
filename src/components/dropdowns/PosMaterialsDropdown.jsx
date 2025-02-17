import { useGetAllPosMaterials } from "@/features/shelves/api/queries/useGetAllPosMaterials";
import Label from "../texts/Label";
import BaseDropdown from "./BaseDropdown";
import { useEffect } from "react";

export default function PosMaterialsDropdown({
  variant = "base",
  defaultText = "Select Materials",
  className,
  isDisable,
  selected,
  setSelected,
  params = {
    setToUrl: false,
    isEnabled: false,
  },
}) {
  const { data, isLoading, isFetching, setParams } = useGetAllPosMaterials({
    setToUrl: params.setToUrl,
    isEnabled: params.isEnabled,
  });
  useEffect(() => {
    setParams({ brand_id: params.brand_id });
  }, [params.brand_id]);
  return (
    <div className="">
      <Label label="Materials list" />

      <BaseDropdown
        variant={variant}
        defaultText={defaultText}
        className={`w-full ${className}`}
        isLoading={isLoading || isFetching}
        options={data?.data || []}
        selected={selected}
        setSelected={(data) => setSelected(data)}
        isDisable={isDisable}
      />
    </div>
  );
}
