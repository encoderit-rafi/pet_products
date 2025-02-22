import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import cn from "@/lib/utils/cn";
import ConnectIcon from "@/assets/icons/ConnectIcon";
import { useTheme } from "@/context/ThemeProvider";
import DrawerApplicationSupport from "../drawers/DrawerApplicationSupport";
import CardApplicationSupport from "../cards/CardApplicationSupport";
import DrawerSingleApplicationSupport from "../drawers/DrawerSingleApplicationSupport";
import { useGetAllRoles } from "@/api/roles/queries/useGetAllRoles";
import UserCardSkeleton from "@/features/roles/components/UserCardSkeleton";
import BorderBox from "../box/BorderBox";
import CloseIcon from "@/assets/icons/CloseIcon";
import BaseInput from "../inputs/BaseInput";
import ImagePickerIcon from "../file_pickers/ImagePickerIcon";
import SendIcon from "@/assets/icons/SendIcon";

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
  // { setIsOpenDrawerApplicationSupport }
  const {
    data: allUsers,
    refetch: fetchAllUsers,
    isLoadingAllUsers: isLoadingAllUsers,
    isFetching: isFetchingAllUsers,
    params: paramsAllUsers,
    setParams: setParamsAllUsers,
  } = useGetAllRoles();
  const { isDark } = useTheme();
  // const [isOpenContact, setIsOpenContact] = useState(false);
  // const [selectedRole, setSelectedRole] = useState("");
  const [isOpenDrawerApplicationSupport, setIsOpenDrawerApplicationSupport] =
    useState(false);
  const [
    isOpenDrawerSingleApplicationSupport,
    setIsOpenDrawerSingleApplicationSupport,
  ] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const handleMenuItemClick = (item) => {
    setParamsAllUsers((data) => ({ ...data, connect_role: item.value }));
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
        <DrawerApplicationSupport
          isOpen={isOpenDrawerApplicationSupport}
          setIsOpen={() => setIsOpenDrawerApplicationSupport(false)}
        >
          {isLoadingAllUsers || isFetchingAllUsers ? (
            // Show skeleton loaders when data is loading or fetching
            Array.from({ length: 5 }, (_, i) => (
              <BorderBox
                key={i}
                className="p-2 lg:p-2 !border-custom_bg_one animate-pulse h-fit"
              >
                <div className="flex items-center gap-2">
                  {/* Skeleton for image */}
                  <div className="size-14 bg-custom_bg_one rounded-2xl">
                    <div className="rounded-lg bg-custom_bg_one w-14 h-14"></div>
                  </div>
                  {/* Skeleton for text */}
                  <div className="flex flex-col justify-center flex-1 space-y-1">
                    <div className="w-3/4 h-3 rounded bg-custom_bg_one"></div>
                    <div className="w-1/2 h-2 rounded bg-custom_bg_one"></div>
                  </div>
                </div>
              </BorderBox>
            ))
          ) : allUsers?.data?.length > 0 ? (
            // Show user cards if data is available
            allUsers.data.map((user) => (
              <CardApplicationSupport
                key={user.id}
                user={user}
                onClickOpenSingleApplicationSupport={() =>
                  setIsOpenDrawerSingleApplicationSupport(true)
                }
                onClickOpenChat={() => setIsOpenChat(true)}
              />
            ))
          ) : (
            // Show "No data found" when data is empty
            <p className="text-center text-red-500">No data found</p>
          )}

          <div
            className={` bg-transparent absolute inset-0 !mt-0 ${
              isOpenChat ? "visible " : "invisible"
            }`}
          >
            <div
              className="h-full relative"
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
                <div className="flex shrink-0 items-center  justify-between p-2 pb-0">
                  <div className="flex items-center gap-1">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="object-cover object-center size-8 rounded-full"
                    />
                    <span>User Name</span>
                  </div>
                  <div
                    className="size-5 flex items-center justify-center bg-red-500 rounded-full"
                    onClick={(e) => {
                      // e.stopPropagation();
                      setIsOpenChat(false);
                    }}
                  >
                    <CloseIcon className={"size-2"} />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 p-2">
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
                <div className="flex items-center p-2 shrink-0 gap-2">
                  {/* <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg outline-none"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  /> */}
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
          </div>
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
