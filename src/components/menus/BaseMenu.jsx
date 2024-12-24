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
          "inline-flex text-[11px] border text-custom_text_two font-extralight capitalize items-center justify-between gap-2 bg-custom_bg_two border-custom_line_two rounded-full py-1.5 px-3",
          className
        )}
      >
        {value?.name ?? text}
        <DownIcon className="w-2 text-custom_text_one" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className={cn(
          "w-56 z-[60] text-custom_text_two origin-top-right rounded-lg  mt-2 bg-[#21272b] p-2 text-sm/6 text-white transition duration-200 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 space-y-2",
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
                  "data-[focus]:bg-[#313639]": isDark,
                  "data-[focus]:bg-[#ffffff]": !isDark,
                  "bg-[#ffffff] pl-5": !isDark && item.value == value?.value,
                  "bg-[#313639] pl-5": isDark && item.value == value?.value,
                  //     ${
                  //   item.value == value?.value && "bg-white/10"
                  // }
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
