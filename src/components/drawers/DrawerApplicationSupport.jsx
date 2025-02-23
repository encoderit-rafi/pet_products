import React from "react";
import Drawer from "../navigators/Drawer";
import Title from "../texts/Title";
import BaseButton from "../buttons/BaseButton";
import CardApplicationSupport from "../cards/CardApplicationSupport";
import BorderBox from "../box/BorderBox";

export default function DrawerApplicationSupport({
  isOpen,
  setIsOpen,
  children,
  query,
}) {
  return (
    <Drawer isOpen={isOpen} className="flex flex-col max-w-md relative">
      <Title>Application Support</Title>
      <div className="space-y-2 mt-4">
        {query?.isLoading || query?.isFetching ? (
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
        ) : query?.data?.length > 0 ? (
          // Show user cards if data is available
          query?.data.map((user) => (
            <CardApplicationSupport
              key={user.id}
              user={user}
              onClickOpenSingleApplicationSupport={() =>
                setIsOpenDrawerSingleApplicationSupport(true)
              }
              // onClickOpenChat={() => setIsOpenChat(true)}
            />
          ))
        ) : (
          // Show "No data found" when data is empty
          <p className="text-center text-red-500">No data found</p>
        )}
      </div>
      <div className="flex-1 mt-5 space-y-3 overflow-y-auto">{children}</div>
      <BaseButton onClick={setIsOpen} className="mt-10">
        done
      </BaseButton>
    </Drawer>
  );
}
