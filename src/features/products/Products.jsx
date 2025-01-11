import React, { useEffect, useMemo, useState } from "react";
import demoData from "@/lib/data/demo";
import Table from "@/components/tables/Table";
import BaseMenu from "@/components/menus/BaseMenu";
import ExportButton from "@/components/buttons/ExportButton";
import BorderBox from "@/components/box/BorderBox";
import PlaceholderImage from "@/components/placeholders/PlaceholderImage";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import InputSearch from "@/components/inputs/InputSearch";
import Title from "@/components/texts/Title";
import { useGetAllProducts } from "./api/queries/useGetAllProducts";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useGetAllCategories } from "@/api/categories/queries/useGetAllCategories";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/pagination";
import { PAGINATION } from "@/consts";
import { useDebounce } from "@/hooks/useDebounce";


const categories = [
  {
    id: 1,
    name: "category 1",
    value: "category_1",
  },
  {
    id: 2,
    name: "category 2",
    value: "category_2",
  },
  {
    id: 3,
    name: "category 3",
    value: "category_3",
  },
];

export default function Products() {
  const { data: allBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const { data: allCategories, isLoading: isLoadingAllCategories,
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
    setToUrl: true, isEnabled: true,
  });
  const [search, setSearch] = useState(paramsAllProducts.search || '');
  const debouncedSearch = useDebounce(search);
  useEffect(() => {
    setParamsAllProducts((old) => ({ ...old, page: 1, search: debouncedSearch }))
  }, [debouncedSearch]);
  useEffect(() => {
    // fetchAllProducts()
    if (allBrands?.length > 0 || paramsAllProducts.brand_id) {
      setBrand(allBrands?.find(item => item.id == paramsAllProducts.brand_id))
    }
  }, [allBrands,])
  useEffect(() => {
    // fetchAllProducts()
    if (allCategories?.length > 0 || paramsAllProducts.brand_id) {
      setCategory(allCategories?.find(item => item.id == paramsAllProducts.category_id))
    }
  }, [allCategories])
  useEffect(() => {
    brand?.id && setParamsAllProducts((old) => ({
      page: 1, per_page: old.per_page,
      search: old.search, brand_id: brand?.id
    }))
    brand?.id && setParamsAllCategories({ brand_id: brand?.id })
    setCategory(null)
  }, [brand]);
  useEffect(() => {
    category?.id && setParamsAllProducts((old) => ({ ...old, page: 1, category_id: category?.id }))
  }, [category]);

  const queryProducts = useMemo(() => ({
    headers: [
      {
        name: "name",
        value: "name",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="size-5">
                {
                  row?.image_url ?
                    <img
                      src={row?.image_url}
                      alt=""
                      className="object-cover object-center rounded-full size-full"
                    />
                    :
                    < PlaceholderImage />
                }

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
        name: "total_unit_sold",
        value: "total_unit_sold",
        cellValue: (row) => {
          return row?.total_unit_sold;
        },
      },
      {
        name: "total_revenue",
        value: "total_revenue",
        cellValue: (row) => {
          return row?.total_revenue;
        },
      },
      {
        name: "criteria_category",
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

  }), [allProducts]);
  const queryProductsLoading = {
    headers: [
      {
        name: "name",
        value: "name",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="size-5 rounded-full bg-custom_bg_one animate-pulse" />
              <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
            </div>
          );
        },
      },
      {
        name: "sku",
        value: "product_sku",
        cellValue: () => <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ,
      },
      {
        name: "brand",
        value: "brand",
        cellValue: () => <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
      },
      {
        name: "category",
        value: "category",
        cellValue: () => <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
      },

      {
        name: "total_unit_sold",
        value: "total_unit_sold",
        cellValue: () => <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ,
      },
      {
        name: "total_revenue",
        value: "total_revenue",
        cellValue: () => <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />

      },
      {
        name: "criteria_category",
        value: "criteria_category",
        cellValue: () => <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />

      },
    ],
    isLoading: false,
    data: Array.from({ length: PAGINATION.per_page }, (_, i) => (i))


  }
  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title onClick={() => setIsOpenDrawer(true)}>dashboard </Title>
          <div className="flex items-start lg:items-center gap-3">
            <div className="w-[150px] lg:w-[111px]">
              <InputSearch className="pr-1 py-1.5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className=" md:flex items-center hidden gap-3">
              <BaseMenu
                text={isLoadingAllBrands ? "Loading..." : "select brand"}
                data={allBrands || []}
                value={brand}
                setValue={(item) => setBrand(item)}
                isLoading={isLoadingAllBrands}
              />
              <BaseMenu
                text={isLoadingAllCategories ? "Loading..." : "select category"}
                data={allCategories || []}
                value={category}
                setValue={(item) => setCategory(item)}
                isLoading={isLoadingAllCategories}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex-1">

            <BaseMenu
              text={isLoadingAllBrands ? "Loading..." : "select brand"}
              data={allBrands || []}
              value={brand}
              setValue={(item) => setBrand(item)}
              isLoading={isLoadingAllBrands}
              className={'w-full'}
            />
          </div>
          <div className="flex-1">

            <BaseMenu
              text={isLoadingAllCategories ? "Loading..." : "select category"}
              data={allCategories || []}
              value={category}
              setValue={(item) => setCategory(item)}
              isLoading={isLoadingAllCategories}
              className={'w-full'}

            />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {
          (isLoadingAllProducts ||
            isFetchingAllProducts) &&
          // allProducts?.data?.total > 0 
          <BorderBox>
            <Table query={queryProductsLoading} />
          </BorderBox>
        }
        {
          !isLoadingAllProducts &&
          !isFetchingAllProducts &&
          allProducts?.total > 0 &&
          <BorderBox>
            <Table query={{ ...queryProducts, data: allProducts?.data || [], }} />
          </BorderBox>
        }
        {
          !isLoadingAllProducts &&
          !isFetchingAllProducts &&
          allProducts?.total == 0 &&
          <BorderBox>
            <h5 className="text-xl text-center text-red-500">No data found
            </h5>
          </BorderBox>
        }
      </div>

      {allProducts?.total > 0 && (
        <Pagination
          to={allProducts?.to}
          total={allProducts?.total}
          current_page={allProducts?.current_page}
          last_page={allProducts?.last_page}
          per_page={allProducts?.per_page}
          onPageChange={(val) =>
            setParamsAllProducts((old) => ({ ...old, page: val }))
          }
          onPerPageChange={(val) =>
            setParamsAllProducts((old) => ({ page: 1, per_page: val }))
          }
        />
      )}
    </div>
  );
}
