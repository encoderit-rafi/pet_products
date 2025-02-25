import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import cn from "@/lib/utils/cn";
import ConnectIcon from "@/assets/icons/ConnectIcon";
import { useTheme } from "@/context/ThemeProvider";
import DrawerApplicationSupport from "../drawers/DrawerApplicationSupport";
import CardApplicationSupport from "../cards/CardApplicationSupport";
import DrawerSingleApplicationSupport from "../drawers/DrawerSingleApplicationSupport";
import { useGetAllRoles } from "@/api/roles/useGetAllRoles";
import UserCardSkeleton from "@/features/users/components/UserCardSkeleton";
import BorderBox from "../box/BorderBox";
import CloseIcon from "@/assets/icons/CloseIcon";
import BaseInput from "../inputs/BaseInput";
import ImagePickerIcon from "../file_pickers/ImagePickerIcon";
import SendIcon from "@/assets/icons/SendIcon";
import { useGetAllUsers } from "@/api/users/useGetAllUsers";

const data = [
  {
    id: 1,
    name: "Marketing",
    value: "marketing",
  },
  {
    id: 2,
    name: "Sales",
    value: "sales",
  },
  {
    id: 3,
    name: "Finance",
    value: "finance",
  },
  {
    id: 4,
    name: "Supply Chain",
    value: "supply_chain",
  },
  {
    id: 5,
    name: "Support",
    value: "support",
  },
  {
    id: 6,
    name: "Plan a Visit",
    value: "plan_a_visit",
  },
];
export default function ButtonContact() {
  const [connectRole, setConnectRole] = useState(null);

  const { isDark } = useTheme();
  const [isOpenDrawerApplicationSupport, setIsOpenDrawerApplicationSupport] =
    useState(false);
  const [
    isOpenDrawerSingleApplicationSupport,
    setIsOpenDrawerSingleApplicationSupport,
  ] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const handleMenuItemClick = (item) => {
    console.log("🚀 ~ handleMenuItemClick ~ item:", item);
    setConnectRole(item.value);
    // setParamsAllUsers((data) => ({ ...data, connect_role: item.value }));
    setIsOpenDrawerApplicationSupport(true);
  };
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm just a bot!", sender: "bot" },
      ]);
    }, 1000);
  };
  const [images, setImages] = useState([]);

  function onHandleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    selectedFiles?.length > 0 && setImages(selectedFiles);
  }
  return (
    <>
      <div className="relative">
        <Menu>
          <MenuButton className={cn("btn-contact ")}>
            <ConnectIcon className="w-10" />
            <span className="">connect</span>
          </MenuButton>
          <MenuItems
            transition
            anchor="right center"
            className={cn(
              "w-full  lg:!max-w-80 z-[60] rounded-2xl bg-custom_bg_nine p-4 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 grid grid-cols-2 gap-3 shadow-lg",
              {
                "bg-[#4D4D4D]": isDark,
                "bg-[#ffffff]": !isDark,
              }
            )}
          >
            {data?.map((item) => (
              <MenuItem key={item.id}>
                <button
                  className={cn(
                    `group text-center text-xs font-extralight capitalize w-full items-center gap-2 rounded-xl py-3 px-7`,
                    {
                      "bg-[#393939] text-[#ffffff]": isDark,
                      "bg-[#f8f8f8] text-[#000000]": !isDark,
                    }
                  )}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item?.name}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
        {/* Application Support Drawer */}
        {/* <DrawerApplicationSupport
          isOpen={isOpenDrawerApplicationSupport}
          setIsOpen={() => setIsOpenDrawerApplicationSupport(false)}
          setIsOpen={() => setIsOpenDrawerApplicationSupport(false)}
          query={{
            isLoading: isLoadingAllUsers,
            isFetching: isFetchingAllUsers,
            data: allUsers,
          }}
        > */}
        <DrawerApplicationSupport
          isOpen={isOpenDrawerApplicationSupport}
          setIsOpen={() => {
            setConnectRole(null);
            setIsOpenDrawerApplicationSupport(false);
          }}
          connect={connectRole}
          setConnect={setConnectRole}
        >
          {/* <div
            className={` bg-transparent absolute inset-0 !mt-0 ${
              isOpenChat ? "visible " : "invisible"
            }`}
          >
            <div
              className="relative h-full"
              onClick={(e) => {
                // e.stopPropagation();
                // setIsOpenChat(false);
              }}
            >
              <div
                className={`absolute bottom-0 duration-500 h-96 bg-custom_bg_one rounded-t-xl  w-full flex flex-col gap-2 ${
                  isOpenChat ? "translate-y-0" : "translate-y-96"
                }`}
              >
                <div className="flex items-center justify-between p-2 pb-0 shrink-0">
                  <div className="flex items-center gap-1">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="object-cover object-center rounded-full size-8"
                    />
                    <span>User Name</span>
                  </div>
                  <div
                    className="flex items-center justify-center bg-red-500 rounded-full size-5"
                    onClick={(e) => {
                      // e.stopPropagation();
                      setIsOpenChat(false);
                    }}
                  >
                    <CloseIcon className={"size-2"} />
                  </div>
                </div>
                <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${
                        msg.sender === "user" ? "justify-end" : ""
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-full max-w-xs ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-2 shrink-0">
                  <ImagePickerIcon
                    handleFileChange={onHandleFileChange}
                    className="p-0 border-none"
                  />

                  <BaseInput
                    palceholder={"enter text..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <div className="text-custom_yellow " onClick={sendMessage}>
                    <SendIcon className={"size-6"} />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </DrawerApplicationSupport>
        {/* Single Application Support Drawer */}
        <DrawerSingleApplicationSupport
          isOpen={isOpenDrawerSingleApplicationSupport}
          setIsOpen={() => setIsOpenDrawerSingleApplicationSupport(false)}
        />
      </div>
    </>
  );
}
