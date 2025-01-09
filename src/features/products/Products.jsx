import React, { useEffect, useState } from "react";
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

const query = {
  headers: [
    {
      name: "name",
      value: "name",
      cellValue: (row) => {
        return (
          <div className="flex items-center gap-3">
            <div className="size-5">
              <PlaceholderImage />
            </div>
            <span>{row.name}</span>
          </div>
        );
      },
    },
    {
      name: "sku",
      value: "sku",
      cellValue: (row) => {
        return row?.sku;
      },
    },
    {
      name: "brand",
      value: "brand",
      cellValue: (row) => {
        return row?.brand;
      },
    },
    {
      name: "category",
      value: "category",
      cellValue: (row) => {
        return row?.category;
      },
    },
    {
      name: "total units sold",
      value: "total_units_sold",
      cellValue: (row) => {
        return row?.total_units_sold;
      },
    },
    {
      name: "total units sold",
      value: "total_units_sold",
      cellValue: (row) => {
        return row?.total_units_sold;
      },
    },
    {
      name: "criteria category",
      value: "criteria_category",
      cellValue: (row) => {
        return row?.criteria_category;
      },
    },
    {
      name: <p className="text-right">actions</p>,
      value: "actions",
      cellValue: (row) => {
        return (
          <div className="flex flex-row-reverse gap-3 text-custom_yellow">
            <DeleteIcon className={"h-4"} />
            <EditIcon className={"h-4"} />
          </div>
        );
      },
    },
  ],
  isLoading: false,
  data: demoData,
};

const brands = [
  {
    id: 1,
    name: "brand 1",
    value: "brand_1",
  },
  {
    id: 2,
    name: "brand 2",
    value: "brand_2",
  },
  {
    id: 3,
    name: "brand 3",
    value: "brand_3",
  },
];
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
  // const { data: getAllBrands } = useGetAllBrands();
  const { data: getAllCategories, refetch: fetchAllCategories, searchParams: searchParamsAllCategories } = useGetAllCategories();
  const {
    data: allProducts,
    refetch: fetchAllProducts,
    isLoading: isLoadingAllProducts,
    isFetching: isFetchingAllProducts,
    params: paramsAllProducts,
    setParams: setParamsAllProducts,
  } = useGetAllProducts({ setToUrl: true, isEnabled: false });
  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    console.log({ allProducts })
  }, [allProducts]);
  // const [brand, setBrand] = useState(getAllBrands?.[0]);
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title onClick={() => setIsOpenDrawer(true)}>dashboard</Title>
          <div className="flex items-center gap-3">
            <div className="w-[111px]">
              <InputSearch className="pr-1 py-1.5" />
            </div>
            <div className="items-center hidden gap-3 lg:flex">

              <BaseMenu
                text="select brand"
                data={brands}
                value={brand}
                setValue={(item) => setBrand(item)}
              />
              <BaseMenu
                text="select category"
                data={categories}
                value={category}
                setValue={(item) => setCategory(item)}
              />
              {/* <ExportButton /> */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:hidden">

          <BaseMenu
            text="brand"
            data={brands}
            value={brand}
            setValue={(item) => setBrand(item)}
          />
          <BaseMenu
            text="category"
            data={categories}
            value={category}
            setValue={(item) => setCategory(item)}
          />
          {/* <ExportButton /> */}
        </div>
      </div>
      <BorderBox>
        <Table query={query} />
      </BorderBox>
    </div>
  );
}
