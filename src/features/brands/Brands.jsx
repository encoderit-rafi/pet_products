import React, { useEffect, useMemo, useState, useCallback } from "react";

import { PAGINATION } from "@/consts";

import Title from "@/components/texts/Title";
import Table from "@/components/tables/Table";
import Pagination from "@/components/pagination";
import BaseMenu from "@/components/menus/BaseMenu";
import BorderBox from "@/components/box/BorderBox";
import InputSearch from "@/components/inputs/InputSearch";
import PlaceholderImage from "@/components/placeholders/PlaceholderImage";

import { useGetAllBrands } from "./api/queries/useGetAllBrands";
// import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
// import { useGetAllCategories } from "@/api/categories/queries/useGetAllCategories";
// import { useGetAllBrands } from "./api/queries/useGetAllBrands";
// import { useSearchParam } from "react-use";
import { useSearchParams } from "react-router-dom";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import ImageDialog from "@/components/dialogs/ImageDialog";
import getImageUrl from "@/lib/utils/getImageUrl";

export default function Brands() {
  const [searchParams] = useSearchParams();
  const {
    data: allBrands,
    isLoading: isLoadingAllBrands,
    isFetching: isFetchingAllBrands,
    params: paramsAllBrands,
    setParams: setParamsAllBrands,
  } = useGetAllBrands({ setToUrl: true, isEnabled: true });

  // const {
  //   data: allCategories,
  //   isLoading: isLoadingAllCategories,
  //   setParams: setParamsAllCategories,
  // } = useGetAllCategories();
  // const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  // const [brand, setBrand] = useState();
  // useEffect(() => {
  //   const id = searchParams.get("brand_id");
  //   const name = searchParams.get("brand_name");
  //   if (id && name) {
  //     setBrand({ id, name });
  //   }
  // }, [searchParams]);
  // const [category, setCategory] = useState(null);
  // const {
  //   data: allProducts,
  //   refetch: fetchAllProducts,
  //   isLoading: isLoadingAllProducts,
  //   isFetching: isFetchingAllProducts,
  //   params: paramsAllProducts,
  //   setParams: setParamsAllProducts,
  // } = useGetAllProducts({
  //   setToUrl: true,
  //   isEnabled: false,
  // });
  const [search, setSearch] = useState(paramsAllBrands.search || "");
  // useEffect(() => {
  //   fetchAllProducts();
  // }, [paramsAllProducts]);

  // useEffect(() => {
  //   if (allBrands?.length > 0 || paramsAllProducts.brand_id) {
  //     setBrand(
  //       allBrands?.find((item) => item.id == paramsAllProducts.brand_id)
  //     );
  //   }
  // }, [allBrands]);

  // useEffect(() => {
  //   if (allCategories?.length > 0 || paramsAllProducts.brand_id) {
  //     setCategory(
  //       allCategories?.find((item) => item.id == paramsAllProducts.category_id)
  //     );
  //   }
  // }, [allCategories]);
  // useEffect(() => {
  //   brand?.id &&
  //     setParamsAllProducts((old) => ({
  //       ...old,
  //       page: 1,
  //       per_page: old.per_page,
  //       brand_id: brand?.id,
  //     }));
  //   brand?.id && setParamsAllCategories({ brand_id: brand?.id });
  //   setCategory(null);
  // }, [brand]);
  // useEffect(() => {
  //   category?.id &&
  //     setParamsAllProducts((old) => ({
  //       ...old,
  //       page: 1,
  //       category_id: category?.id,
  //     }));
  // }, [category]);

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
  const queryProducts = useMemo(
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
      // isLoading: true,
      data: allBrands?.data || [],
    }),
    [allBrands]
  );

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title onClick={() => setIsOpenDrawer(true)}>brands </Title>
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
            {/* <div className="items-center hidden gap-3 md:flex">
              <BaseDropdown
                variant="rounded"
                defaultText="select brand"
                isLoading={isLoadingAllBrands}
                options={allBrands || []}
                selected={[brand]}
                setSelected={(data) => {
                  data?.id != brand?.id && setBrand(data);
                }}
              />
              <BaseDropdown
                variant="rounded"
                defaultText="select category"
                isLoading={isLoadingAllCategories}
                options={allCategories || []}
                selected={[category]}
                setSelected={(data) => {
                  data?.id != category?.id && setCategory(data);
                }}
                errorText={
                  brand?.id ? "No Category Found" : "Select a Brand First"
                }
              />
            </div> */}
          </div>
        </div>
        {/* <div className="flex items-center gap-3 md:hidden">
          <div className="flex-1">
            <BaseDropdown
              variant="rounded"
              defaultText="select brand"
              isLoading={isLoadingAllBrands}
              options={allBrands || []}
              selected={[brand]}
              setSelected={(data) => {
                data?.id != brand?.id && setBrand(data);
              }}
            />
            <BaseDropdown
              variant="rounded"
              defaultText="select category"
              isLoading={isLoadingAllCategories}
              options={allCategories || []}
              selected={[category]}
              setSelected={(data) => {
                data?.id != category?.id && setCategory(data);
              }}
              errorText={
                brand?.id ? "No Category Found" : "Select a Brand First"
              }
            />
          </div>
          <div className="flex-1">
            <BaseMenu
              text={isLoadingAllCategories ? "Loading..." : "select category"}
              data={allCategories || []}
              value={category}
              setValue={(item) => setCategory(item)}
              isLoading={isLoadingAllCategories}
              errorText={
                brand?.id ? "No Category Found" : "Select a Brand First"
              }
            />
          </div>
        </div> */}
      </div>
      <div className="flex-1 overflow-auto">
        <BorderBox>
          <Table query={queryProducts} />
        </BorderBox>
      </div>
      {allBrands?.total > 0 && (
        <Pagination
          to={allBrands?.to}
          total={allBrands?.total}
          current_page={allBrands?.current_page}
          last_page={allBrands?.last_page}
          per_page={allBrands?.per_page}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </div>
  );
}
