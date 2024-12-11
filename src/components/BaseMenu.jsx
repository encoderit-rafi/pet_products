import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import BoxIcon from "@/assets/icons/BoxIcon";
import DownIcon from "@/assets/icons/DownIcon";

export default function BaseMenu({ text, data, value, setValue }) {
  return (
    <Menu>
      <MenuButton className="inline-flex text-[11px] text-custom_text_two font-extralight capitalize items-center gap-2 bg-custom_bg_two border rounded-full py-1.5 px-3 shadow-inner focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white">
        {value?.name || text}
        <DownIcon className="w-2 text-custom_text_one" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl mt-2 bg-[#21272b] p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 space-y-2"
      >
        {data.map((item) => (
          <MenuItem key={item.id}>
            <button
              className={`group text-xs  capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 ${
                item.value == value?.value && "bg-white/10"
              }`}
              onClick={() => setValue(item)}
            >
              {item?.name}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
