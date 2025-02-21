import React, { useMemo, useState, useCallback } from "react";
import Title from "@/components/texts/Title";
import Table from "@/components/tables/Table";
import Pagination from "@/components/pagination";
import BorderBox from "@/components/box/BorderBox";
import InputSearch from "@/components/inputs/InputSearch";
import ImageDialog from "@/components/dialogs/ImageDialog";
import getImageUrl from "@/lib/utils/getImageUrl";
import { useGetAllStores } from "./api/queries/useGetAllStores";

export default function Stores() {
  const {
    data: allStores,
    isLoading: isLoadingAllStores,
    isFetching: isFetchingAllStores,
    params: paramsAllStores,
    setParams: setParamsAllStores,
  } = useGetAllStores({ setToUrl: true, isEnabled: true });

  const [search, setSearch] = useState(paramsAllStores.search || "");

  const handlePageChange = useCallback(
    (val) => setParamsAllStores((old) => ({ ...old, page: val })),
    [setParamsAllStores]
  );

  const handlePerPageChange = useCallback(
    (val) => setParamsAllStores((old) => ({ ...old, page: 1, per_page: val })),
    [setParamsAllStores]
  );

  const handelSearch = () => {
    setParamsAllStores((old) => ({ ...old, page: 1, search: search }));
  };
  // TABLE HEADERS
  const queryStores = useMemo(
    () => ({
      headers: [
        {
          name: "name",
          value: "name",
          cellValue: (row) => {
            return (
              <div className="flex items-center gap-3">
                {/* <div className="size-5">
                  <ImageDialog
                    src={getImageUrl(row.series, "logo", "jpg")}
                    name={row?.product_name_en}
                  />
                </div> */}
                <span>{row?.name_en || "-"}</span>
              </div>
            );
          },
        },
        {
          name: "owner name",
          value: "owner_name",
          cellValue: (row) => {
            return row?.owner_name || "-";
          },
        },
        {
          name: "owner phone",
          value: "owner_phone",
          cellValue: (row) => {
            return row?.owner_phone || "-";
          },
        },
        {
          name: "location",
          value: "location",
          cellValue: (row) => {
            return row?.location || "-";
          },
        },
        {
          name: "location",
          value: "location",
          cellValue: (row) => {
            return row?.location || "-";
          },
        },
        {
          name: "SAP Code",
          value: "sap_client_code",
          cellValue: (row) => {
            return row?.sap_client_code || "-";
          },
        },
        {
          name: "status",
          value: "status",
          cellValue: (row) => {
            return row?.status || "-";
          },
        },
      ],
      isLoading: isLoadingAllStores || isFetchingAllStores,
      data: allStores?.data || [],
    }),
    [allStores]
  );

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title onClick={() => setIsOpenDrawer(true)}>Stores </Title>
          <div className="flex items-start gap-3 lg:items-center">
            <div className="w-[150px] lg:w-[111px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handelSearch();
                }}
              >
                <InputSearch
                  className="pr-1 py-1.5"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <BorderBox>
          <Table query={queryStores} />
        </BorderBox>
      </div>
      {allStores?.total > 0 && (
        <Pagination
          to={allStores?.to}
          total={allStores?.total}
          current_page={allStores?.current_page}
          last_page={allStores?.last_page}
          per_page={allStores?.per_page}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </div>
  );
}
