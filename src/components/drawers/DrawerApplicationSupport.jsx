import React, { useCallback, useEffect } from "react";
import Drawer from "../navigators/Drawer";
import Title from "../texts/Title";
import BaseButton from "../buttons/BaseButton";
import CardApplicationSupport from "../cards/CardApplicationSupport";
import BorderBox from "../box/BorderBox";
import Pagination from "../pagination";
import { useGetAllUsers } from "@/api/users/useGetAllUsers";

export default function DrawerApplicationSupport({
  isOpen,
  setIsOpen,
  // children,
  connect,
  // setConnect,
  // query,
}) {
  const {
    data,
    refetch: fetch,
    isLoading,
    isFetching,
    params,
    setParams,
  } = useGetAllUsers({ setToUrl: false, isEnabled: false });
  // useEffect(() => {
  //   console.log("🚀 ~ data:", data);
  // }, [data]);
  useEffect(() => {
    fetch();
  }, [params]);
  useEffect(() => {
    // console.log("🚀 ~ data:", data);
    connect && setParams((data) => ({ ...data, connect_role: connect }));
  }, [connect]);
  const handlePageChange = useCallback(
    (val) => setParams((old) => ({ ...old, page: val })),
    [setParams]
  );

  const handlePerPageChange = useCallback(
    (val) => setParams((old) => ({ ...old, page: 1, per_page: val })),
    [setParams]
  );
  // console.log("✅ ~ query:", data);
  return (
    <Drawer
      isOpen={isOpen}
      className="relative flex flex-col max-w-md space-y-4"
    >
      <Title>Application Support</Title>
      <div className="flex-1 mt-5 space-y-3 overflow-y-auto">
        {isLoading || isFetching ? (
          // Show skeleton loaders when data is loading or fetching
          Array.from({ length: 5 }, (_, i) => (
            <BorderBox
              key={i}
              className="p-2 lg:p-2 !border-custom_bg_one animate-pulse h-fit"
            >
              <div className="flex items-center gap-2">
                <div className="size-14 bg-custom_bg_one rounded-2xl">
                  <div className="rounded-lg bg-custom_bg_one w-14 h-14"></div>
                </div>
                <div className="flex flex-col justify-center flex-1 space-y-1">
                  <div className="w-3/4 h-3 rounded bg-custom_bg_one"></div>
                  <div className="w-1/2 h-2 rounded bg-custom_bg_one"></div>
                </div>
              </div>
            </BorderBox>
          ))
        ) : data?.data?.length > 0 ? (
          // Show user cards if data is available
          data?.data.map((user) => (
            <CardApplicationSupport
              key={user.id}
              user={user}
              // onClickOpenSingleApplicationSupport={() =>
              //   setIsOpenDrawerSingleApplicationSupport(true)
              // }
              // onClickOpenChat={() => setIsOpenChat(true)}
            />
          ))
        ) : (
          <p className="text-center text-red-500">No data found</p>
        )}
      </div>
      {data?.total > 0 && (
        <Pagination
          from={data?.from}
          to={data?.to}
          total={data?.total}
          current_page={data?.current_page}
          last_page={data?.last_page}
          per_page={data?.per_page}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}

      <BaseButton onClick={setIsOpen} className="mt-10">
        done
      </BaseButton>
    </Drawer>
  );
}
