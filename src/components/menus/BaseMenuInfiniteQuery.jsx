import React, { useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DownIcon from "@/assets/icons/DownIcon";
import cn from "@/lib/utils/cn";
import { useTheme } from "@/context/ThemeProvider";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import { useInView } from "react-intersection-observer";
// import { useGetAllBrands } from "@/hooks/useGetAllBrands"; // Import the custom hook

export default function BaseMenuInfiniteQuery({
  text,
  value,
  setValue,
  className,
  errorText = "No data found",
  data,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) {
  "data", data;
  const { isDark } = useTheme();
  const { ref, inView } = useInView({
    threshold: 0,
    // triggerOnce: true
  });

  // Get brands data using the custom hook
  // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllBrands();

  // Trigger fetchNextPage when the observer is in view
  // useEffect(() => {
  //  if (inView && hasNextPage) {
  //   fetchNextPage();
  //  }
  // }, [inView, hasNextPage, fetchNextPage]);
  useEffect(() => {
    ("scroll last");
    fetchNextPage();
  }, [inView]);

  // const items = data?.pages?.flatMap((page) => page) || []; // Flatten the paginated data

  return (
    <Menu>
      <MenuButton
        className={cn(
          "inline-flex whitespace-nowrap text-xs border text-custom_text_two font-light capitalize items-center justify-between gap-2 bg-custom_bg_two border-custom_line_two rounded-full py-1.5 px-3",
          { "cursor-not-allowed": isLoading },
          className
        )}
        disabled={isLoading}
      >
        {value?.name ?? text}
        {isLoading ? (
          <LoadingIcon className="w-3 text-custom_line_two" />
        ) : (
          <DownIcon className="w-3 text-custom_line_two" />
        )}
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className={cn(
          "w-56 z-[60] h-40 overflow-auto origin-top-right rounded-lg mt-2 p-2 text-sm/6 transition duration-200 ease-out focus:outline-none space-y-2",
          {
            "bg-[#21272b]": isDark,
            "bg-[#f8f8f8]": !isDark,
          }
        )}
      >
        {data.length > 0 ? (
          data?.map((item) => (
            <MenuItem key={item.id}>
              <button
                className={cn(
                  "group text-xs transition-all duration-300 !hover:bg-red-600 hover:pl-5 capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3",
                  {
                    "text-white": isDark,
                    "text-black": !isDark,
                    "bg-[#ffffff] pl-5": !isDark && item.id === value?.id,
                    "bg-[#313639] pl-5": isDark && item.id === value?.id,
                  }
                )}
                onClick={() => setValue(item)}
              >
                {item?.name}
              </button>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <button className="group text-xs transition-all duration-300 !hover:bg-red-600 text-center capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-red-500">
              {errorText}
            </button>
          </MenuItem>
        )}

        {/* Infinite scrolling trigger */}
        {/* {hasNextPage && (
     <MenuItem ref={ref}>
      <div className="text-center text-xs text-gray-500">
       {isFetchingNextPage ? "Loading more..." : "Load more..."}
      </div>
     </MenuItem>
    )} */}
        {hasNextPage && (
          <MenuItem ref={ref}>
            <div className="text-center text-xs text-gray-500">
              {/* {isFetchingNextPage ? "Loading more..." : "Load more..."} */}
              Loading more...
            </div>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
}
