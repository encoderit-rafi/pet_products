import { Fragment, useState, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { useInView } from "react-intersection-observer";
import cn from "@/lib/utils/cn";
import { useTheme } from "@/context/ThemeProvider";
import CheckIcon from "@/assets/icons/CheckIcon";
import Label from "../texts/Label";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import DownIcon from "@/assets/icons/DownIcon";
import { useInfiniteGetAllStores } from "@/api/stores/useInfiniteGetAllStores";

export default function ClientCombobox({
  disabled,
  required,
  selected,
  setSelected,
  className,
  variant = "base",
  searchable = false,
  multiple = false,
  defaultText = "Select an client",
  errorText = "No data found",
  field = "name_en",
  params,
}) {
  console.log("✅ ~ selected:", selected);
  // console.log("🚀 ~ disabled:", disabled);
  const {
    data: clients,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    handleSearch,
  } = useInfiniteGetAllStores();

  const { ref, inView } = useInView();
  const { isDark } = useTheme();
  const [query, setQuery] = useState(() => selected?.[0]?.[field]);
  useEffect(() => {
    setQuery(selected?.[0]?.[field]);
  }, [selected]);
  const [isOpen, setIsOpen] = useState(false);
  function onClickHandler(data) {
    console.log("🚀 ~ onClickHandler ~ data:", data);
    setSelected(data);
    // setIsOpen(true);
    // !multiple && closeDropdown();
  }
  function closeDropdown() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  // const clients = data?.pages?.flatMap((page) => page.clients) ?? [];
  // useEffect(() => {
  //   handleSearch({  search: query });
  // }, [params.brand_id]);
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    handleSearch({ search: query });
    setIsOpen(true); // ✅ Keep dropdown open after search
  };

  return (
    <div className="w-full">
      <Label
        label={`client ${
          selected.length > 0 && searchable && multiple
            ? `(${selected.length})`
            : ""
        }`}
        required={required}
      />

      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          {searchable ? (
            <form
              onSubmit={handleSearchSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // ✅ Prevents form submission on Enter
                  handleSearchSubmit(e); // ✅ Manually trigger search
                }
              }}
            >
              <input
                className={cn(
                  "base-input",
                  { "cursor-wait": isLoading },
                  className
                )}
                placeholder="Search clients..."
                value={query}
                disabled={disabled}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
              />
            </form>
          ) : (
            <ListboxButton
              className={cn(
                "flex items-center justify-between",
                {
                  "cursor-wait": isLoading,
                  "base-input": variant == "base",
                  "select-dropdown-rounded": variant == "rounded",
                },
                className
              )}
              disabled={disabled || isLoading}
              onClick={() => setIsOpen((prev) => !prev)}
              onBlur={() => setIsOpen(false)}
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
                {isLoading || isFetching ? <LoadingIcon /> : <DownIcon />}
              </div>
            </ListboxButton>
          )}

          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ListboxOptions
              static
              // anchor="bottom end"
              className={cn(
                "absolute z-10 mt-1 space-y-1 w-full p-1 max-h-60 overflow-auto rounded-md shadow-lg",
                {
                  "bg-[#21272b] text-white": isDark,
                  "bg-white text-black": !isDark,
                }
              )}

              // className={cn(
              //   "z-[60] mt-1 space-y-1 rounded-xl p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-200 ease-in data-[leave]:data-[closed]:opacity-0 shadow-lg",
              //   {
              //     "w-[var(--button-width)]": variant == "base",
              //     "w-56": variant == "rounded",
              //     "bg-[#21272b]": isDark,
              //     "bg-[#f8f8f8]": !isDark,
              //   }
              // )}
            >
              {isLoading ? (
                <p className="p-2 text-lime-300 text-sm">Loading...</p>
              ) : clients.length === 0 ? (
                <p className="p-2 text-gray-500">{errorText}</p>
              ) : (
                clients.map((client) => (
                  <ListboxOption
                    key={client.id}
                    // className={({ active }) =>
                    //   cn("cursor-pointer select-none p-2", {
                    //     "bg-gray-200": active,
                    //   })
                    // }
                    className={cn(
                      "group text-xs cursor-pointer transition-all duration-300  capitalize  w-full flex justify-between items-center gap-2 rounded-lg py-1.5 px-3 hover:px-4",
                      {
                        "text-white": isDark,
                        "text-black": !isDark,
                        "hover:bg-[#313639]": isDark,
                        "hover:bg-[#ffffff]": !isDark,
                        "bg-[#ffffff]":
                          !isDark &&
                          selected?.some((select) => select?.id == client?.id),
                        "bg-[#313639]":
                          isDark &&
                          selected?.some((select) => select?.id == client?.id),
                      }
                    )}
                    value={client}
                    onClick={() => onClickHandler(client)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="">
                        ({client.sap_client_code}) {client.name_en}
                      </span>
                      <CheckIcon
                        className={cn(
                          "invisible transition-all duration-500 scale-90 opacity-0 shrink-0 size-3 text-[#74b222]",
                          {
                            "opacity-100 visible scale-100 ": selected?.some(
                              (select) => select?.id == client?.id
                            ),
                          }
                        )}
                      />
                    </div>
                  </ListboxOption>
                ))
              )}
              <div ref={ref} className="h-3" />
              {isFetchingNextPage && (
                <p className="p-2 text-lime-300 text-sm">Loading more...</p>
              )}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
