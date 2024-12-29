import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DownIcon from "@/assets/icons/DownIcon";
import cn from "@/lib/utils/cn";
import { useTheme } from "@/context/ThemeProvider";

export default function BaseMenu({ text, data, value, setValue, className }) {
  const { isDark } = useTheme();
  return (
    <Menu>
      <MenuButton
        className={cn(
          "inline-flex whitespace-nowrap  text-xs border text-custom_text_two font-extralight capitalize items-center justify-between gap-2 bg-custom_bg_two border-custom_line_two rounded-full py-1.5 px-3",
          className
        )}
      >
        {value?.name ?? text}
        <DownIcon className="w-3 text-custom_line_two" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className={cn(
          "w-56 z-[60] origin-top-right rounded-lg mt-2 bg-[#21272b] p-2 text-sm/6  transition duration-200 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 space-y-2",
          {
            "bg-[#21272b]": isDark,
            "bg-[#f8f8f8]": !isDark,
          }
        )}
      >
        {data.map((item) => (
          <MenuItem key={item.id}>
            <button
              className={cn(
                "group text-xs transition-all duration-300 !hover:bg-red-600 hover:pl-5 capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-[#ffffff] ",
                {
                  "text-white": isDark,
                  "text-black": !isDark,
                  "data-[focus]:bg-[#313639]": isDark,
                  "data-[focus]:bg-[#ffffff]": !isDark,
                  "bg-[#ffffff] pl-5": !isDark && item.value == value?.value,
                  "bg-[#313639] pl-5": isDark && item.value == value?.value,
                }
              )}
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
