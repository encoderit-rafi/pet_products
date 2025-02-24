import React, { useMemo, useState, useCallback } from "react";
import Title from "@/components/texts/Title";
import Table from "@/components/tables/Table";
import Pagination from "@/components/pagination";
import BorderBox from "@/components/box/BorderBox";
import InputSearch from "@/components/inputs/InputSearch";
import ImageDialog from "@/components/dialogs/ImageDialog";
import getImageUrl from "@/lib/utils/getImageUrl";
import { useGetAllStores } from "./api/queries/useGetAllStores";
import Page from "@/components/ui/Page";

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
            return <span className="w-32 truncate">{row?.name_en || "-"}</span>;
          },
        },
        {
          name: "owner name",
          value: "owner_name",
          cellValue: (row) => {
            return (
              <span className="w-32 truncate">{row?.owner_name || "-"}</span>
            );
          },
        },
        {
          name: "owner phone",
          value: "owner_phone",
          cellValue: (row) => {
            return (
              <span className="w-32 truncate">{row?.owner_phone || "-"}</span>
            );
          },
        },
        {
          name: "location",
          value: "location",
          cellValue: (row) => {
            return (
              <span className="w-32 truncate">{row?.location || "-"}</span>
            );
          },
        },
        {
          name: "SAP Code",
          value: "sap_client_code",
          cellValue: (row) => {
            return (
              <span className="w-32 truncate">
                {row?.sap_client_code || "-"}
              </span>
            );
          },
        },
        {
          name: "status",
          value: "status",
          cellValue: (row) => {
            return <span className="w-32 truncate">{row?.status || "-"}</span>;
          },
        },
      ],
      isLoading: isLoadingAllStores || isFetchingAllStores,
      data: allStores?.data || [],
    }),
    [allStores]
  );

  return (
    <Page
      title="stores"
      actions={
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
      }
      footer={
        allStores?.total > 0 && (
          <Pagination
            from={allStores?.from}
            to={allStores?.to}
            total={allStores?.total}
            current_page={allStores?.current_page}
            last_page={allStores?.last_page}
            per_page={allStores?.per_page}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        )
      }
    >
      <BorderBox>
        <Table query={queryStores} />
      </BorderBox>
    </Page>
  );
}
