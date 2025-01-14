import { Fragment, useState } from "react";
import CheckIcon from "@/assets/icons/CheckIcon";
import CloseIcon from "@/assets/icons/CloseIcon";
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
import LoadingIcon from "@/assets/icons/LoadingIcon";

const BaseDropdown = ({
  isLoading = false,
  options,
  // selected,
  // setSelected,
  className,
  variant = "base",
  defaultText = "select option",
  multiple = false,
  showCloseButton = false,
  toggleSelected = false,
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleOption = (data) => {
    setSelected((prev) =>
      prev.some((item) => item.id == data.id)
        ? prev.filter((item) => item.id !== data.id)
        : [...prev, data]
    );
  };
  // function openDropdown() {
  //   setIsOpen(true);
  // }
  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative w-full">
      <Listbox
        as="div"
        // value={selected}
        open={isOpen}
      >
        <ListboxButton
          className={cn(
            // "relative w-full text-left base-input",

            "flex items-center justify-between gap-2 !py-2 focus:outline-none data-[focus]:outline-none data-[focus]:-outline-offset-none",
            {
              "cursor-wait": isLoading,
              "base-input": variant == "base",
              "select-dropdown-rounded": variant == "rounded",
            },
            className
          )}
          disabled={isLoading}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="leading-none ">
            {multiple && selected?.length > 0
              ? `Selected (${selected?.length})`
              : !multiple && selected?.name
              ? selected.name
              : defaultText}
          </span>
          <div className="flex items-center justify-center size-3 text-custom_line_two">
            {isLoading ? <LoadingIcon /> : <DownIcon />}
          </div>
        </ListboxButton>

        <Transition
          as={Fragment}
          show={isOpen}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            static
            anchor="bottom end"
            // className={cn(
            //   "z-[60] h-40 origin-top-right rounded-lg mt-2 p-2 text-sm/6  transition duration-200 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 space-y-2",
            //   {
            //     "w-[var(--button-width)]": variant == "base",
            //     "w-56": variant == "rounded",
            //     "bg-[#21272b]": isDark,
            //     "bg-[#f8f8f8]": !isDark,
            //   }
            // )}
            className={cn(
              "z-[60] mt-1 space-y-1 rounded-xl p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-200 ease-in data-[leave]:data-[closed]:opacity-0",
              {
                "w-[var(--button-width)]": variant == "base",
                "w-56": variant == "rounded",
                "bg-[#21272b]": isDark,
                "bg-[#f8f8f8]": !isDark,
              }
            )}
          >
            {options?.map((option) => (
              <ListboxOption
                key={option.id}
                value={option.id}
                // className={cn(
                //   "group text-xs transition-all duration-300  hover:pl-5 capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3 cursor-pointer",
                //   {
                //     "text-white": isDark,
                //     "text-black": !isDark,
                //     "data-[focus]:bg-[#313639]": isDark,
                //     "data-[focus]:bg-[#ffffff]": !isDark,
                //     // "bg-[#ffffff] ": !isDark && item.id == selected?.id,
                //     // "bg-[#313639]": isDark && item.id == selected?.id,
                //     // "bg-[#ffffff] ": !isDark && item.id == selected?.id,
                //     // "bg-[#313639]": isDark && item.id == selected?.id,
                //   }
                // )}
                className={cn(
                  "group text-xs cursor-pointer transition-all duration-300  capitalize  w-full flex justify-between items-center gap-2 rounded-lg py-1.5 px-3 hover:px-4",
                  {
                    "text-white": isDark,
                    "text-black": !isDark,
                    "data-[focus]:bg-[#313639]": isDark,
                    "data-[focus]:bg-[#ffffff]": !isDark,
                    // "bg-[#ffffff] pl-5":
                    //   !isDark &&
                    //   selectedOptions.some((select) => select.id == option.id),
                    // "bg-[#313639] pl-5":
                    //   isDark &&
                    //   selectedOptions.some((select) => select.id == option.id),
                  }
                )}
                onClick={() => toggleOption(option)}
              >
                {/* {((multiple &&
                  selected.some((select) => select?.id == option?.id)) ||
                  selected?.id == option?.id) && (
                  <CheckIcon className="size-4" />
                )} */}
                <span>{option.name}</span>
                {/* <CheckIcon className="invisible transition-all duration-500 scale-90 opacity-0 group-hover:opacity-100 group-hover:visible group-hover:scale-100 size-4" /> */}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
      {isOpen && <div className="fixed inset-0 z-0" onClick={closeDropdown} />}
    </div>
  );
};

export default BaseDropdown;
