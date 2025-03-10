import { useEffect, useState, useRef, useMemo } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useInfiniteGetBrands } from "@/api/brands/useInfiniteGetBrands";
import { useSearchParams } from "react-router-dom";

export default function BrandSelect() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, handleSearch } =
    useInfiniteGetBrands();
  console.log("🚀 ~ BrandSelect ~ data:", data);
  const brandData = useMemo(() => data.map((item) => item.data).flat(), [data]);
  console.log("🚀 ~ BrandSelect ~ brandData:", brandData);
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchParams] = useSearchParams();
  const listRef = useRef(null);

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Detect when user scrolls to bottom and load more
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const onScroll = () => {
      if (list.scrollHeight - list.scrollTop <= list.clientHeight + 10) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    list.addEventListener("scroll", onScroll);
    return () => list.removeEventListener("scroll", onScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Combobox value={selectedBrand} onChange={setSelectedBrand}>
      <div className="relative w-72">
        <ComboboxInput
          className="w-full border rounded-md p-2 bg-transparent text-white"
          placeholder="Search brands..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(query);
            }
          }}
        />
        <ComboboxOptions
          ref={listRef}
          className="absolute mt-2 max-h-60 w-full overflow-y-auto border bg-blue-500 shadow-md"
        >
          {brandData.length === 0 ? (
            <div className="p-2 text-gray-500">No brands found</div>
          ) : (
            brandData.map((brand) => (
              <ComboboxOption
                key={brand.id}
                value={brand}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {brand.name}
              </ComboboxOption>
            ))
          )}
          {isFetchingNextPage && (
            <div className="p-2 text-center text-gray-500">Loading more...</div>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
