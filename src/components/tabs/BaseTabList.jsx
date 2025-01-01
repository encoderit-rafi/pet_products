import React from "react";
import { Tab, TabList } from "@headlessui/react";
import cn from "@/lib/utils/cn";
export default function BaseTabList({ list, className }) {
  return (
    <TabList className={cn(className?.tabList)}>
      {list.map((item, index) => (
        <Tab
          key={index}
          className={cn("border-b-2 text-xs font-light !text-custom_text_eleven  border-b-custom_line_six data-[selected]:border-b-custom_bg_three data-[selected]:!text-custom_bg_three p-3 focus:outline-none", className?.tab)}
        >
          {item.name}
        </Tab>
      ))}
    </TabList>
  );
}
