import React, { useEffect, useMemo, useState, useCallback } from "react";

import { PAGINATION } from "@/consts";

import Title from "@/components/texts/Title";
import Table from "@/components/tables/Table";
import Pagination from "@/components/pagination";
import BaseMenu from "@/components/menus/BaseMenu";
import BorderBox from "@/components/box/BorderBox";
import InputSearch from "@/components/inputs/InputSearch";
import PlaceholderImage from "@/components/placeholders/PlaceholderImage";

import { useGetAllProducts } from "./api/queries/useGetAllProducts";
// import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useGetAllCategories } from "@/api/categories/queries/useGetAllCategories";
import BaseMenuInfiniteQuery from "@/components/menus/BaseMenuInfiniteQuery";
import {
  useGetAllBrands,
  useGetAllBrandsInfinite,
} from "@/api/brands/queries/useGetAllBrands";

export default function Products() {
  // const { data: allBrands, isLoading: isLoadingAllBrands, params: paramsAllBrands, setParams: setParamsAllBrands } = useGetAllBrands();
  const [storeAllBrands, setStoreAllBrands] = useState([]);
  const {
    data: allBrands,
    status: statusAllBrands,
    hasNextPage: hasNextPageAllBrands,
    fetchNextPage: fetchNextPageAllBrands,
    isFetchingNextPage: isFetchingNextPageAllBrands,
  } = useGetAllBrandsInfinite();
  useEffect(() => {
    if (allBrands?.pages?.length > 0) {
      const modifyAll = allBrands?.pages.reduce((initial, page) => {
        return [...initial, ...page.data];
      }, []);
      setStoreAllBrands(modifyAll);
    }
  }, [allBrands?.pages]);

  const {
    data: allCategories,
    isLoading: isLoadingAllCategories,
    setParams: setParamsAllCategories,
  } = useGetAllCategories();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [brand, setBrand] = useState();
  const [category, setCategory] = useState(null);
  const {
    data: allProducts,
    refetch: fetchAllProducts,
    isLoading: isLoadingAllProducts,
    isFetching: isFetchingAllProducts,
    params: paramsAllProducts,
    setParams: setParamsAllProducts,
  } = useGetAllProducts({
    setToUrl: true,
    isEnabled: false,
  });
  const [search, setSearch] = useState(paramsAllProducts.search || "");
  useEffect(() => {
    fetchAllProducts();
  }, [paramsAllProducts]);

  // useEffect(() => {
  //   if (allBrands?.length > 0 || paramsAllProducts.brand_id) {
  //     setBrand(allBrands?.find(item => item.id == paramsAllProducts.brand_id))
  //   }
  // }, [allBrands])
  // useEffect(() => {
  //   if (allBrands?.pages?.[0]?.data?.length > 0 || paramsAllProducts.brand_id) {
  //     setBrand(
  //       allBrands?.pages?.[0]?.data?.find(
  //         (item) => item.id == paramsAllProducts.brand_id
  //       )
  //     );
  //   }
  // }, [allBrands?.pages?.[0]]?.data);
  useEffect(() => {
    if (storeAllBrands?.length > 0 || paramsAllProducts.brand_id) {
      setBrand(
        storeAllBrands?.find((item) => item.id == paramsAllProducts.brand_id)
      );
    }
  }, [storeAllBrands]);

  useEffect(() => {
    if (allCategories?.length > 0 || paramsAllProducts.brand_id) {
      setCategory(
        allCategories?.find((item) => item.id == paramsAllProducts.category_id)
      );
    }
  }, [allCategories]);
  useEffect(() => {
    brand?.id &&
      setParamsAllProducts((old) => ({
        ...old,
        page: 1,
        per_page: old.per_page,
        brand_id: brand?.id,
      }));
    brand?.id && setParamsAllCategories({ brand_id: brand?.id });
    setCategory(null);
  }, [brand]);
  useEffect(() => {
    category?.id &&
      setParamsAllProducts((old) => ({
        ...old,
        page: 1,
        category_id: category?.id,
      }));
  }, [category]);

  const handlePageChange = useCallback(
    (val) => setParamsAllProducts((old) => ({ ...old, page: val })),
    [setParamsAllProducts]
  );

  const handlePerPageChange = useCallback(
    (val) =>
      setParamsAllProducts((old) => ({ ...old, page: 1, per_page: val })),
    [setParamsAllProducts]
  );

  const handelSearch = () => {
    setParamsAllProducts((old) => ({ ...old, page: 1, search: search }));
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
                  {row?.image_url ? (
                    <img
                      src={row?.image_url}
                      alt={row?.product_name_en}
                      onError={(e) =>
                        (e.target.src =
                          "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg")
                      }
                      aria-label="An illustrative image"
                      className="object-cover object-center rounded-full size-full"
                    />
                  ) : (
                    <PlaceholderImage />
                  )}
                </div>
                <span>{row?.product_name_en || "-"}</span>
              </div>
            );
          },
        },
        {
          name: "sku",
          value: "product_sku",
          cellValue: (row) => {
            return row?.product_sku || "-";
          },
        },
        {
          name: "brand",
          value: "brand",
          cellValue: (row) => {
            return row?.brand?.name || "-";
          },
        },
        {
          name: "category",
          value: "category",
          cellValue: (row) => {
            return row?.category?.name || "-";
          },
        },
        {
          name: "total unit sold",
          value: "total_unit_sold",
          cellValue: (row) => {
            return <p className="text-right">{row?.total_unit_sold}</p>;
          },
        },
        {
          name: "total sales value ",
          value: "total_revenue",
          cellValue: (row) => {
            return (
              <p className="text-right">
                {row?.total_revenue ? `SR ${row?.total_revenue}` : "-"}
              </p>
            );
          },
        },
        {
          name: "criteria category",
          value: "criteria_category",
          cellValue: (row) => {
            return row?.criteria_category?.name || "-";
          },
        },
        // {
        //   name: <p className="text-right">actions</p>,
        //   value: "actions",
        //   cellValue: (row) => {
        //     return (
        //       <div className="flex flex-row-reverse gap-3 text-custom_yellow">
        //         <DeleteIcon className={"h-4"} />
        //         <EditIcon className={"h-4"} />
        //       </div>
        //     );
        //   },
        // },
      ],
      isLoading: false,
      data: allProducts?.data || [],
    }),
    [allProducts]
  );
  const queryProductsLoading = {
    headers: [
      {
        name: "name",
        value: "name",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
              <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
            </div>
          );
        },
      },
      {
        name: "sku",
        value: "product_sku",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "brand",
        value: "brand",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "category",
        value: "category",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },

      {
        name: "total unit sold",
        value: "total_unit_sold",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "total sales value ",
        value: "total_revenue",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "criteria category",
        value: "criteria_category",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
    ],
    isLoading: false,
    data: Array.from({ length: PAGINATION.per_page }, (_, i) => i),
  };

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title onClick={() => setIsOpenDrawer(true)}>dashboard </Title>
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
            <div className="items-center hidden gap-3 md:flex">
              <BaseMenuInfiniteQuery
                text={
                  statusAllBrands == "loading" ? "Loading..." : "select brand"
                }
                // data={allBrands?.data || []}
                // data={allBrands?.pages?.[0]?.data || []}
                data={storeAllBrands || []}
                value={brand}
                setValue={(item) => setBrand(item)}
                isLoading={statusAllBrands == "loading"}
                fetchNextPage={() => fetchNextPageAllBrands()}
                hasNextPage={hasNextPageAllBrands}
                isFetchingNextPage={isFetchingNextPageAllBrands}
              />
              {/* <BaseMenu
                text={isLoadingAllBrands ? "Loading..." : "select brand"}
                data={allBrands || []}
                value={brand}
                setValue={(item) => setBrand(item)}
                isLoading={isLoadingAllBrands}

              /> */}
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
          </div>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex-1">
            {/* <BaseMenu
              text={isLoadingAllBrands ? "Loading..." : "select brand"}
              data={allBrands || []}
              value={brand}
              setValue={(item) => setBrand(item)}
              isLoading={isLoadingAllBrands}

            /> */}
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
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <BorderBox>
          {isLoadingAllProducts || isFetchingAllProducts ? (
            <Table query={queryProductsLoading} />
          ) : allProducts?.total > 0 ? (
            <Table
              query={{ ...queryProducts, data: allProducts?.data || [] }}
            />
          ) : (
            <h5 className="text-xl text-center text-red-500">No data found</h5>
          )}
        </BorderBox>
      </div>
      {allProducts?.total > 0 && (
        <Pagination
          to={allProducts?.to}
          total={allProducts?.total}
          current_page={allProducts?.current_page}
          last_page={allProducts?.last_page}
          per_page={allProducts?.per_page}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </div>
  );
}
