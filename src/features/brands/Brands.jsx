import React, { useMemo, useState, useCallback } from "react";
import Title from "@/components/texts/Title";
import Table from "@/components/tables/Table";
import Pagination from "@/components/pagination";
import BorderBox from "@/components/box/BorderBox";
import InputSearch from "@/components/inputs/InputSearch";
import { useSearchParams } from "react-router-dom";
import ImageDialog from "@/components/dialogs/ImageDialog";
import getImageUrl from "@/lib/utils/getImageUrl";
import { useGetAllBrands } from "./api/queries/useGetAllBrands";
import Page from "@/components/ui/Page";

export default function Brands() {
  const {
    data: allBrands,
    isLoading: isLoadingAllBrands,
    isFetching: isFetchingAllBrands,
    params: paramsAllBrands,
    setParams: setParamsAllBrands,
  } = useGetAllBrands({ setToUrl: true, isEnabled: true });

  const [search, setSearch] = useState(paramsAllBrands.search || "");

  const handlePageChange = useCallback(
    (val) => setParamsAllBrands((old) => ({ ...old, page: val })),
    [setParamsAllBrands]
  );

  const handlePerPageChange = useCallback(
    (val) => setParamsAllBrands((old) => ({ ...old, page: 1, per_page: val })),
    [setParamsAllBrands]
  );

  const handelSearch = () => {
    setParamsAllBrands((old) => ({ ...old, page: 1, search: search }));
  };
  // TABLE HEADERS
  const queryBrands = useMemo(
    () => ({
      headers: [
        {
          name: "name",
          value: "name",
          cellValue: (row) => {
            return (
              <div className="flex items-center gap-3">
                <div className="size-5">
                  <ImageDialog
                    src={getImageUrl(row.series, "logo", "jpg")}
                    name={row?.product_name_en}
                  />
                </div>
                <span>{row?.name || "-"}</span>
              </div>
            );
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
          name: "SAP number",
          value: "sap_number",
          cellValue: (row) => {
            return row?.sap_number || "-";
          },
        },
        {
          name: "series",
          value: "series",
          cellValue: (row) => {
            return row?.series || "-";
          },
        },
      ],
      isLoading: isLoadingAllBrands || isFetchingAllBrands,
      data: allBrands?.data || [],
    }),
    [allBrands]
  );

  return (
    <Page
      title="brands"
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
        allBrands?.total > 0 && (
          <Pagination
            to={allBrands?.to}
            total={allBrands?.total}
            current_page={allBrands?.current_page}
            last_page={allBrands?.last_page}
            per_page={allBrands?.per_page}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        )
      }
    >
      <BorderBox>
        <Table query={queryBrands} />
      </BorderBox>
    </Page>
  );
}
