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
import { Fragment, useState } from "react";

// const options = [
//   { id: 1, name: "Option 1" },
//   { id: 2, name: "Option 2" },
//   { id: 3, name: "Option 3" },
// ];

const MultiSelectListbox = ({
  options,
  selectedOptions,
  setSelectedOptions,
  className,
}) => {
  const { isDark } = useTheme();
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (data) => {
    setSelectedOptions((prev) =>
      prev.some((item) => item.id == data.id)
        ? prev.filter((item) => item.id !== data.id)
        : [...prev, data]
    );
  };

  const closeListbox = () => setIsOpen(false);

  return (
    <div className="relative w-full">
      <Listbox
        as="div"
        value={selectedOptions}
        open={isOpen}
        onChange={() => {}}
      >
        <ListboxButton
          className={cn(
            "relative w-full text-left base-input",
            "focus:outline-none data-[focus]:outline-none data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            className
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>
            {selectedOptions?.length > 0
              ? `Selected (${selectedOptions?.length})`
              : "Select options"}
          </span>
          <DownIcon
            className="absolute -translate-y-1/2 pointer-events-none group top-1/2 right-4 size-4 text-custom_line_one"
            aria-hidden="true"
          />
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
            anchor="bottom"
            className={cn(
              "w-[var(--button-width)] z-[60] mt-1 space-y-1 rounded-lg border border-white/5  p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-200 ease-in data-[leave]:data-[closed]:opacity-0",
              {
                "bg-[#21272b]": isDark,
                "bg-[#f8f8f8]": !isDark,
              }
            )}
          >
            {options?.map((option) => (
              <ListboxOption
                key={option.id}
                value={option.id}
                // className={`group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-white/10 ${selectedOptions.includes(option.id) && "bg-white/10"
                //   }`}
                className={cn(
                  "group text-xs cursor-pointer transition-all duration-300 !hover:bg-red-600 hover:pl-5 capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3",
                  {
                    "text-white": isDark,
                    "text-black": !isDark,
                    "data-[focus]:bg-[#313639]": isDark,
                    "data-[focus]:bg-[#ffffff]": !isDark,
                    "bg-[#ffffff] pl-5":
                      !isDark &&
                      selectedOptions.some((select) => select.id == option.id),
                    "bg-[#313639] pl-5":
                      isDark &&
                      selectedOptions.some((select) => select.id == option.id),
                  }
                )}
                onClick={() => toggleOption(option)}
              >
                {selectedOptions.some((select) => select.id == option.id) && (
                  <CheckIcon className="size-4" />
                )}

                <span className="text-sm/6">{option.name}</span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>

      {/* Close on outside click */}
      {isOpen && <div className="fixed inset-0 z-0" onClick={closeListbox} />}
      {selectedOptions?.length > 0 && (
        <div className="flex items-center w-full gap-3 pb-1 mt-3 overflow-x-auto">
          {selectedOptions?.map((option) => (
            <div
              key={option.id}
              className="flex items-center gap-5 px-4 py-2 text-sm font-light rounded-xl text-custom_text_two bg-custom_bg_eleven whitespace-nowrap"
            >
              <span>{option.name}</span>
              <div
                className="cursor-pointer size-3 text-custom_text_two"
                onClick={() =>
                  setSelectedOptions((prev) =>
                    prev.filter((item) => item.id != option.id)
                  )
                }
              >
                <CloseIcon />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectListbox;
