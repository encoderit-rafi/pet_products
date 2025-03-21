import { useInfiniteGetBrands } from "@/api/brands/useInfiniteGetBrands";
import { Fragment, useState, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { useInView } from "react-intersection-observer";
import cn from "@/lib/utils/cn";
import { useTheme } from "@/context/ThemeProvider";

export default function BrandList(
  // isLoading = false,
  // isDisable = false,
  {
    options,
    selected = [],
    setSelected,
    className,
    variant = "base",
    defaultText = "select option",
    errorText = "No data found",
    multiple = false,
    field = "name",
  }
) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    handleSearch,
  } = useInfiniteGetBrands();
  // console.log("🚀 ~ BrandList ~ data:", data);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // ✅ Manages dropdown state

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
    setIsOpen(true); // ✅ Keep dropdown open after search
  };

  const { isDark } = useTheme();
  return (
    <div className="w-64">
      <Combobox
        value={selectedBrand}
        onChange={(brand) => {
          setSelectedBrand(brand);
          setIsOpen(false); // ✅ Close dropdown on selection
        }}
      >
        <div className="relative">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit}>
            <ComboboxInput
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
              // className="w-full border px-4 py-2 rounded-md bg-black text-white"
              placeholder="Search brands..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true); // ✅ Keep dropdown open while typing
              }}
              onFocus={() => setIsOpen(true)} // ✅ Open dropdown on focus
              onBlur={() => setTimeout(() => setIsOpen(false), 200)} // ✅ Close dropdown after a delay when clicking outside
            />
          </form>

          {/* Dropdown */}
          <Transition
            as={Fragment}
            show={isOpen} // ✅ Controls dropdown visibility
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <ComboboxOptions
              className={cn(
                "z-[60] mt-1 space-y-1 absolute w-56 rounded-xl p-1 max-h-60 overflow-auto [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-200 ease-in data-[leave]:data-[closed]:opacity-0 shadow-lg",
                {
                  // "w-[var(--button-width)]": variant == "base",
                  "w-full": variant == "base",
                  "w-56": variant == "rounded",
                  "bg-[#21272b]": isDark,
                  "bg-[#f8f8f8]": !isDark,
                }
              )}
              // className="absolute mt-1 w-full bg-black border rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {isLoading ? (
                <p className="p-2 text-gray-500">Loading...</p>
              ) : data.length === 0 ? (
                <p className="p-2 text-gray-500">No results found.</p>
              ) : (
                data.map((brand) => (
                  <ComboboxOption
                    key={brand.id}
                    // className={({ active }) =>
                    //   `p-2 cursor-pointer ${active ? "bg-gray-200" : ""}`
                    // }
                    className={cn(
                      "group text-xs cursor-pointer transition-all duration-300  capitalize  w-full flex justify-between items-center gap-2 rounded-lg py-1.5 px-3 hover:px-4",
                      {
                        "text-white": isDark,
                        "text-black": !isDark,
                        "hover:bg-[#313639]": isDark,
                        "hover:bg-[#ffffff]": !isDark,
                        // "bg-[#ffffff]":
                        //   !isDark &&
                        //   selected?.some((select) => select?.id == option?.id),
                        // "bg-[#313639]":
                        //   isDark &&
                        //   selected?.some((select) => select?.id == option?.id),
                      }
                    )}
                    value={brand}
                  >
                    {brand.name_en}
                  </ComboboxOption>
                ))
              )}

              {/* Infinite Scroll Trigger */}
              <div ref={ref} className="h-10" />
              {isFetchingNextPage && (
                <p className="p-2 text-lime-300">Loading more...</p>
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
