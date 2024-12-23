import CheckIcon from "@/assets/icons/CheckIcon";
import CloseIcon from "@/assets/icons/CloseIcon";
import DownIcon from "@/assets/icons/DownIcon";
import cn from "@/lib/utils/cn";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, useState } from "react";

const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];

const MultiSelectListbox = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (data) => {
    setSelectedOptions((prev) =>
      prev.includes((item) => item.id == data.id)
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
            "relative block w-full rounded-lg bg-white/5 py-3 pr-8 border border-custom_line_one pl-3 text-left text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>
            {selectedOptions.length > 0
              ? `Selected (${selectedOptions.length})`
              : "Select options"}
          </span>
          <DownIcon
            className="absolute -translate-y-1/2 pointer-events-none group top-1/2 right-4 size-4 fill-white/60"
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
            className="absolute z-10 w-full p-1 mt-1 space-y-2 text-white list-none rounded-md shadow-lg bg-custom_bg_one ring-1 ring-black ring-opacity-5"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option.id}
                // as={Fragment}
                className={`group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-white/10 ${
                  selectedOptions.includes(option.id) && "bg-white/10"
                }`}
                onClick={() => toggleOption(option)}
              >
                <div className="size-4">
                  {selectedOptions.includes(option.id) && (
                    <CheckIcon className={`size-4 text-white`} />
                  )}
                </div>
                <div className="text-white text-sm/6">{option.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>

      {/* Close on outside click */}
      {isOpen && <div className="fixed inset-0 z-0" onClick={closeListbox} />}
      {selectedOptions.length > 0 && (
        <div className="flex items-center w-full gap-3 mt-3 overflow-x-auto">
          {selectedOptions.map((option) => (
            <div className="flex items-center gap-8 px-3 py-4 rounded-xl text-custom_text_two bg-custom_bg_eleven">
              <span>{option.name}</span>
              <div
                className="size-3 text-custom_text_two"
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
