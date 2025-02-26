import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DownIcon from "@/assets/icons/DownIcon";
import cn from "@/lib/utils/cn";
import { useTheme } from "@/context/ThemeProvider";
import LoadingIcon from "@/assets/icons/LoadingIcon";

export default function BaseMenu({
  text,
  data,
  value,
  setValue,
  className,
  isLoading,
  errorText = "No data found",
}) {
  const { isDark } = useTheme();
  return (
    <Menu>
      <MenuButton
        className={cn(
          // "inline-flex whitespace-nowrap  text-xs border text-custom_text_two font-light capitalize items-center justify-between gap-2 bg-custom_bg_two border-custom_line_two rounded-full py-1.5 px-3",
          "select-dropdown-rounded",
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
          "w-56 z-[60] h-40 origin-top-right rounded-lg mt-2 p-2 text-sm/6  transition duration-200 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 space-y-2",
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
                  "group text-xs transition-all duration-300 !hover:bg-red-600 hover:pl-5 capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3  ",
                  {
                    "text-white": isDark,
                    "text-black": !isDark,
                    "data-[focus]:bg-[#313639]": isDark,
                    "data-[focus]:bg-[#ffffff]": !isDark,
                    "bg-[#ffffff] pl-5":
                      // (!isDark && item.value == value?.value) ||
                      !isDark && item.id == value?.id,
                    "bg-[#313639] pl-5":
                      // (isDark && item.value == value?.value) ||
                      isDark && item.id == value?.id,
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
            <button
              className={cn(
                "group text-xs transition-all duration-300 !hover:bg-red-600 text-center capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3  text-red-500"
              )}
            >
              {errorText}
            </button>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
}

// import React, { Fragment, useState } from "react";
// import {
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   Transition,
// } from "@headlessui/react";
// import DownIcon from "@/assets/icons/DownIcon";
// import cn from "@/lib/utils/cn";
// import { useTheme } from "@/context/ThemeProvider";
// import LoadingIcon from "@/assets/icons/LoadingIcon";
// import CheckIcon from "@/assets/icons/CheckIcon";
// import CloseIcon from "@/assets/icons/CloseIcon";

// export default function BaseMenu({
//   text,
//   data,
//   value,
//   setValue,
//   className,
//   isLoading,
//   onHandleClose,
//   showCloseButton = false,
//   errorText = "No data found",
// }) {
//   const { isDark } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);
//   const closeMenu = () => setIsOpen(false);

//   return (
//     <Menu as="div" open={isOpen}>
//       <MenuButton
//         className={cn(
//           "inline-flex whitespace-nowrap  text-xs border text-custom_text_two font-light capitalize items-center justify-between gap-2 bg-custom_bg_two border-custom_line_two rounded-full py-1.5 px-3",
//           { "cursor-not-allowed": isLoading },
//           className
//         )}
//         disabled={isLoading}
//         onClick={() => setIsOpen((prev) => !prev)}
//       >
//         {value?.name ?? text}
//         {isLoading ? (
//           <LoadingIcon className="w-3 text-custom_line_two" />
//         ) : (
//           <DownIcon className="w-3 text-custom_line_two" />
//         )}
//       </MenuButton>
//       <Transition
//         as={Fragment}
//         show={isOpen}
//         leave="transition ease-in duration-100"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <MenuItems
//           transition
//           anchor="bottom end"
//           className={cn(
//             "w-56 z-[60] h-40 origin-top-right rounded-lg mt-2 p-2 text-sm/6  transition duration-200 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 space-y-2",
//             {
//               "bg-[#21272b]": isDark,
//               "bg-[#f8f8f8]": !isDark,
//             }
//           )}
//         >
//           {data.length > 0 ? (
//             data?.map((item) => (
//               <MenuItem key={item.id}>
//                 <button
//                   className={cn(
//                     "group text-xs transition-all duration-300 !hover:bg-red-600 hover:pl-5 capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3  ",
//                     {
//                       "text-white": isDark,
//                       "text-black": !isDark,
//                       "data-[focus]:bg-[#313639]": isDark,
//                       "data-[focus]:bg-[#ffffff]": !isDark,
//                       "bg-[#ffffff] hover:pl-3":
//                         !isDark && item.id == value?.id,
//                       "bg-[#313639] hover:pl-3": isDark && item.id == value?.id,
//                     }
//                   )}
//                   onClick={() => setValue(item)}
//                 >
//                   {item.id == value?.id && <CheckIcon className="size-3" />}
//                   {item?.name}
//                   {showCloseButton && item.id == value?.id && (
//                     <div className="ml-auto size-2 hover:text-red-500">
//                       <CloseIcon className="" />
//                     </div>
//                   )}
//                 </button>
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem>
//               <button
//                 className={cn(
//                   "group text-xs transition-all duration-300 !hover:bg-red-600 text-center capitalize flex w-full items-center gap-2 rounded-lg py-1.5 px-3  text-red-500"
//                 )}
//               >
//                 {errorText}
//               </button>
//             </MenuItem>
//           )}
//         </MenuItems>
//       </Transition>
//       {isOpen && (
//         <div className="fixed inset-0 z-10 bg-red-500/10" onClick={closeMenu} />
//       )}
//     </Menu>
//   );
// }
