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
  isDisable = false,
  options,
  selected,
  setSelected,
  className,
  variant = "base",
  defaultText = "select option",
  errorText = "No data found",
  multiple = false,
  field = "name",
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  function onClickHandler(data) {
    setSelected(data);
    !multiple && closeDropdown();
  }
  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <Listbox as="div" open={isOpen}>
        <ListboxButton
          className={cn(
            // "flex items-center justify-between gap-2 text-sm focus:outline-none data-[focus]:outline-none data-[focus]:-outline-offset-none",
            "flex items-center justify-between",
            {
              "cursor-wait": isLoading,
              "base-input": variant == "base",
              "select-dropdown-rounded": variant == "rounded",
            },
            className
          )}
          disabled={isLoading || isDisable}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="leading-none truncate capitalize">
            {isLoading
              ? defaultText
              : multiple && selected?.length > 0
              ? `Selected (${selected.length})`
              : // : selected?.[0]?.name || defaultText}
                selected?.[0]?.[field] || defaultText}
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
            className={cn(
              "z-[60] mt-1 space-y-1 rounded-xl p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-200 ease-in data-[leave]:data-[closed]:opacity-0 shadow-lg",
              {
                "w-[var(--button-width)]": variant == "base",
                "w-56": variant == "rounded",
                "bg-[#21272b]": isDark,
                "bg-[#f8f8f8]": !isDark,
              }
            )}
          >
            {options?.length > 0 ? (
              options?.map((option) => (
                <ListboxOption
                  key={option?.id}
                  value={option?.id}
                  className={cn(
                    "group text-xs cursor-pointer transition-all duration-300  capitalize  w-full flex justify-between items-center gap-2 rounded-lg py-1.5 px-3 hover:px-4",
                    {
                      "text-white": isDark,
                      "text-black": !isDark,
                      "hover:bg-[#313639]": isDark,
                      "hover:bg-[#ffffff]": !isDark,
                      "bg-[#ffffff]":
                        !isDark &&
                        selected?.some((select) => select?.id == option?.id),
                      "bg-[#313639]":
                        isDark &&
                        selected?.some((select) => select?.id == option?.id),
                    }
                  )}
                  onClick={() => onClickHandler(option)}
                >
                  {/* <span>{option.name}</span> */}
                  <span className="capitalize">{option[field]}</span>
                  <CheckIcon
                    className={cn(
                      "invisible transition-all duration-500 scale-90 opacity-0 shrink-0 size-3 text-[#74b222]",
                      {
                        "opacity-100 visible scale-100 ": selected?.some(
                          (select) => select?.id == option?.id
                        ),
                      }
                    )}
                  />
                </ListboxOption>
              ))
            ) : (
              <ListboxOption
                className={cn(
                  "group text-xs cursor-pointer transition-all duration-300  capitalize  w-full flex justify-between items-center gap-2 rounded-lg py-1.5 px-3 hover:px-4",
                  {
                    "text-white": isDark,
                    "text-black": !isDark,
                    "hover:bg-[#313639]": isDark,
                    "hover:bg-[#ffffff]": !isDark,
                  }
                )}
              >
                <span className="text-red-500">{errorText}</span>
              </ListboxOption>
              // <span className="text-red-500">{errorText}</span>
            )}
          </ListboxOptions>
        </Transition>
      </Listbox>
      {isOpen && <div className="fixed inset-0 z-0" onClick={closeDropdown} />}
    </div>
  );
};

export default BaseDropdown;
