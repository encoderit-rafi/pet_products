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

// const query = {
//   headers: [
//     {
//       name: "name",
//       value: "name",
//       cellValue: (row) => {
//         return (
//           <div className="flex items-center gap-3">
//             <div className="size-5">
//               {
//                 row?.image_url ?
//                   <img
//                     src={row?.image_url}
//                     alt=""
//                     className="object-cover object-center rounded-full size-full"
//                   />
//                   :
//                   < PlaceholderImage />
//               }

//             </div>
//             <span>{row?.name}</span>
//           </div>
//         );
//       },
//     },
//     // {
//     //   name: "sku",
//     //   value: "sku",
//     //   cellValue: (row) => {
//     //     return row?.sku;
//     //   },
//     // },
//     {
//       name: "price",
//       value: "price",
//       cellValue: (row) => {
//         return row?.price;
//       },
//     },
//     {
//       name: "category",
//       value: "category",
//       cellValue: (row) => {
//         return row?.category;
//       },
//     },
//     // {
//     //   name: "total units sold",
//     //   value: "total_units_sold",
//     //   cellValue: (row) => {
//     //     return row?.total_units_sold;
//     //   },
//     // },
//     // {
//     //   name: "total units sold",
//     //   value: "total_units_sold",
//     //   cellValue: (row) => {
//     //     return row?.total_units_sold;
//     //   },
//     // },
//     // {
//     //   name: "criteria category",
//     //   value: "criteria_category",
//     //   cellValue: (row) => {
//     //     return row?.criteria_category;
//     //   },
//     // },
//     // {
//     //   name: <p className="text-right">actions</p>,
//     //   value: "actions",
//     //   cellValue: (row) => {
//     //     return (
//     //       <div className="flex flex-row-reverse gap-3 text-custom_yellow">
//     //         <DeleteIcon className={"h-4"} />
//     //         <EditIcon className={"h-4"} />
//     //       </div>
//     //     );
//     //   },
//     // },
//   ],
//   isLoading: false,
//   data: allProducts?.data || [],

// };

// const brands = [
//   {
//     id: 1,
//     name: "brand 1",
//     value: "brand_1",
//   },
//   {
//     id: 2,
//     name: "brand 2",
//     value: "brand_2",
//   },
//   {
//     id: 3,
//     name: "brand 3",
//     value: "brand_3",
//   },
// ];
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
  const { data: getAllBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const { data: allCategories, isLoading: isLoadingAllCategories,
    refetch: fetchAllCategories,
    setParams: setParamsAllCategories,
  } = useGetAllCategories();
  const [category, setCategory] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  useEffect(() => {
    setParamsAllProducts((old) => ({ ...old, page: 1, search: debouncedSearch }))
  }, [debouncedSearch]);
  const [brand, setBrand] = useState();
  const {
    data: allProducts,
    refetch: fetchAllProducts,
    isLoading: isLoadingAllProducts,
    isFetching: isFetchingAllProducts,
    params: paramsAllProducts,
    setParams: setParamsAllProducts,
  } = useGetAllProducts({
    setToUrl: true, isEnabled: false,
  });
  useEffect(() => {
    fetchAllProducts()
  }, [])
  useEffect(() => {
    fetchAllProducts();
  }, [paramsAllProducts]);
  useEffect(() => {
    setParamsAllProducts((old) => ({ ...old, page: 1, brand_id: brand?.id }))
    setParamsAllCategories({ brand_id: brand?.id })
  }, [brand]);
  useEffect(() => {
    setParamsAllProducts((old) => ({ ...old, page: 1, category_id: category?.id }))
  }, [category]);
  const query = useMemo(() => ({
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
              <span>{row?.name}</span>
            </div>
          );
        },
      },
      // {
      //   name: "sku",
      //   value: "sku",
      //   cellValue: (row) => {
      //     return row?.sku;
      //   },
      // },
      {
        name: "price",
        value: "price",
        cellValue: (row) => {
          return row?.price;
        },
      },
      {
        name: "category",
        value: "category",
        cellValue: (row) => {
          return row?.category;
        },
      },
      // {
      //   name: "total units sold",
      //   value: "total_units_sold",
      //   cellValue: (row) => {
      //     return row?.total_units_sold;
      //   },
      // },
      // {
      //   name: "total units sold",
      //   value: "total_units_sold",
      //   cellValue: (row) => {
      //     return row?.total_units_sold;
      //   },
      // },
      // {
      //   name: "criteria category",
      //   value: "criteria_category",
      //   cellValue: (row) => {
      //     return row?.criteria_category;
      //   },
      // },
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

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title onClick={() => setIsOpenDrawer(true)}>dashboard {allProducts?.data?.length}</Title>
          <div className="flex items-center gap-3">
            <div className="w-[111px]">
              <InputSearch className="pr-1 py-1.5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="items-center hidden gap-3 lg:flex">
              <BaseMenu
                text={isLoadingAllBrands ? "Loading..." : "select brand"}
                data={getAllBrands || []}
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
              {/* <ExportButton /> */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <BaseMenu
            text="brand"
            data={getAllBrands || []}
            value={brand}
            setValue={(item) => setBrand(item)}
          />
          <BaseMenu
            text="category"
            data={categories}
            value={category}
            setValue={(item) => setCategory(item)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {
          !isLoadingAllProducts &&
            !isFetchingAllProducts &&
            allProducts?.data?.length > 0 ?
            <BorderBox>
              <Table query={{ ...query, data: allProducts?.data || [], }} />
            </BorderBox> :
            "loading"
          // allProducts?.data?.length
        }

      </div>
      {allProducts && (
        // <Pagination
        //   to={allProducts?.to}
        //   total={allProducts?.total}
        //   current_page={allProducts?.current_page}
        //   last_page={allProducts?.last_page}
        //   per_page={allProducts?.per_page}
        //   onPageChange={(val) =>
        //     setParamsAllProducts((old) => ({ ...old, page: val }))
        //   }
        //   onPerPageChange={(val) =>
        //     setParamsAllProducts((old) => ({ page: 1, per_page: val }))
        //   }
        // />
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
