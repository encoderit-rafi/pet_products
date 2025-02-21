import React from "react";
import Drawer from "../navigators/Drawer";
import Title from "../texts/Title";
import BaseButton from "../buttons/BaseButton";

export default function DrawerApplicationSupport({
  isOpen,
  setIsOpen,
  children,
}) {
  return (
    <Drawer isOpen={isOpen} className="flex flex-col max-w-md relative">
      <Title>Application Support</Title>
      <div className="flex-1 mt-5 space-y-3 overflow-y-auto">{children}</div>
      <BaseButton onClick={setIsOpen} className="mt-10">
        done
      </BaseButton>
    </Drawer>
  );
}
