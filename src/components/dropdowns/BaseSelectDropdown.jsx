import BoxIcon from "@/assets/icons/BoxIcon";
import CheckIcon from "@/assets/icons/CheckIcon";
import DownIcon from "@/assets/icons/DownIcon";
import { useTheme } from "@/context/ThemeProvider";
import cn from "@/lib/utils/cn";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
// import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
// import clsx from 'clsx'
import { Fragment, useState } from "react";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

export default function BaseSelectDropdown() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(people[1]);

  return (
    <div className="w-full mx-auto">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={cn(
            "relative w-full text-left base-input",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          <span>{selected.name}</span>
          <DownIcon
            className="absolute -translate-y-1/2 pointer-events-none group top-1/2 right-4 size-4 text-custom_line_one"
            aria-hidden="true"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          anchor="bottom"
          className={cn(
            "w-[var(--button-width)] space-y-1 z-[60] mt-1 rounded-lg border border-white/5  p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-200 ease-out data-[leave]:data-[closed]:opacity-0",
            {
              "bg-[#21272b]": isDark,
              "bg-[#f8f8f8]": !isDark,
            }
          )}
        >
          {people?.map((person) => (
            <ListboxOption
              key={person.name}
              value={person}
              // className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              className={cn(
                "group text-xs cursor-pointer transition-all duration-300 !hover:bg-red-600 hover:pl-5 capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3",
                {
                  "text-white": isDark,
                  "text-black": !isDark,
                  "data-[focus]:bg-[#313639]": isDark,
                  "data-[focus]:bg-[#ffffff]": !isDark,
                  "bg-[#ffffff] pl-5": !isDark && person.id == selected?.id,
                  "bg-[#313639] pl-5": isDark && person.id == selected?.id,
                }
              )}
            >
              <CheckIcon className="invisible size-4  group-data-[selected]:visible" />
              <span className="text-sm/6">{person.name}</span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
