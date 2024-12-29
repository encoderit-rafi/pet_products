import React from "react";
import BaseButton from "./BaseButton";

export default function ExportButton() {
  return (
    <BaseButton
      variant="orange"
      className="text-[11px] font-extralight py-1.5 px-3 rounded-full lg:rounded-full"
      onClick={() => setIsOpenAddNewCriteria(true)}
    >
      export
    </BaseButton>
  );
}
