import React from "react";
import BaseButton from "./BaseButton";

export default function ExportButton() {
  return (
    <BaseButton
      variant="orange"
      className="lg:text-xs font-extralight py-1.5 px-3 rounded-full lg:rounded-full border border-custom_orange"
      onClick={() => setIsOpenAddNewCriteria(true)}
    >
      export
    </BaseButton>
  );
}
