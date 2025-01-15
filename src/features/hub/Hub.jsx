import BorderBox from "@/components/box/BorderBox";
import BaseBarChart from "@/components/charts/BaseBarChart";
import InputSearch from "@/components/inputs/InputSearch";
import BasePieChart from "@/components/charts/BasePieChart";
import SubTitle from "@/components/texts/SubTitle";
import ExportButton from "@/components/buttons/ExportButton";
import Title from "@/components/texts/Title";
import BaseDatePicker from "@/components/file_pickers/BaseDatePicker";
import BaseMenu from "@/components/menus/BaseMenu";
import { useState } from "react";
import Table from "@/components/tables/Table";
import PlaceholderImage from "@/components/placeholders/PlaceholderImage";
import { ranges } from "@/consts";

import SalesVsCities from "./components/SalesVsCities";
import TopClients from "./components/TopClients";
import BrandsChart from "./components/BrandsChart";
const demoData = [
  {
    id: 1,
    name: "Product A",
    sku: "SKU001",
    brand: "BrandX",
    category: "Hub Appliances",
    total_units_sold: 499,
    total_sales_value: 28800,
    criteria_category: "High Demand",
  },
  {
    id: 2,
    name: "Product B",
    sku: "SKU002",
    brand: "BrandY",
    category: "Sports",
    total_units_sold: 430,
    total_sales_value: 36454,
    criteria_category: "Moderate Demand",
  },
  {
    id: 3,
    name: "Product C",
    sku: "SKU003",
    brand: "BrandX",
    category: "Sports",
    total_units_sold: 242,
    total_sales_value: 14181,
    criteria_category: "High Demand",
  },
  {
    id: 4,
    name: "Product D",
    sku: "SKU004",
    brand: "BrandB",
    category: "Sports",
    total_units_sold: 490,
    total_sales_value: 37496,
    criteria_category: "Low Demand",
  },
  {
    id: 5,
    name: "Product E",
    sku: "SKU005",
    brand: "BrandX",
    category: "Clothing",
    total_units_sold: 69,
    total_sales_value: 10489,
    criteria_category: "Moderate Demand",
  },
  {
    id: 6,
    name: "Product F",
    sku: "SKU006",
    brand: "BrandX",
    category: "Sports",
    total_units_sold: 461,
    total_sales_value: 26846,
    criteria_category: "High Demand",
  },
];
const monthsData = [
  { id: 1, name: "1 month", value: 1 },
  { id: 2, name: "2 months", value: 2 },
  { id: 3, name: "3 months", value: 3 },
  { id: 4, name: "4 months", value: 4 },
  { id: 5, name: "5 months", value: 5 },
  { id: 6, name: "6 months", value: 6 },
  { id: 7, name: "7 months", value: 7 },
  { id: 8, name: "8 months", value: 8 },
  { id: 9, name: "9 months", value: 9 },
  { id: 10, name: "10 months", value: 10 },
  { id: 11, name: "11 months", value: 11 },
  { id: 12, name: "12 months", value: 12 },
];
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
const query = {
  headers: [
    {
      name: "name",
      value: "name",
      cellValue: (row) => {
        return row.name;
      },
    },
    {
      name: "purchases",
      value: "sku",
      cellValue: (row) => {
        return row?.sku;
      },
    },
    {
      name: "city",
      value: "brand",
      cellValue: (row) => {
        return row?.brand;
      },
    },
  ],
  isLoading: false,
  data: demoData,
};
const query1 = {
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
    // {
    //   name: <p className="text-right">actions</p>,
    //   value: "actions",
    //   cellValue: (row) => {
    //     return (
    //       <div className="flex flex-row-reverse gap-3 text-yellow-400">
    //         <DeleteIcon className={"size-5"} />
    //         <EditIcon className={"size-5"} />
    //       </div>
    //     );
    //   },
    // },
  ],
  isLoading: false,
  data: demoData,
};

export default function Hub() {
  // const { data: dataSalesAndCitiesBarChart,isLoading:isLoadingSalesAndCitiesBarChart,searchParams,setSearchParams } = useGetSalesAndCitiesBarChart()

  const [months, setMonths] = useState(null);
  const [brand, setBrand] = useState(null);

  return (
    <div className="p-1 overflow-x-hidden ">
      <div className="grid grid-cols-12 gap-6">
        {/* heading 1*/}
        <div className="content-center col-span-12">
          <Title>Total Sales</Title>
        </div>
        {/* <div className="col-span-4">
          <InputSearch placeholder="search" />
        </div> */}
        {/* charts 1*/}
        <div className="col-span-12 lg:col-span-8">
          {/* <BorderBox>
            <div className="flex items-center justify-between mb-3">
              <SubTitle>Brands Chart</SubTitle>
              <div className="flex items-center gap-3">
                <BaseMenu
                  text="select month"
                  data={monthsData}
                  value={months}
                  setValue={setMonths}
                />
              </div>
            </div>
            <div className="h-72"></div>
          </BorderBox> */}
          <BrandsChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <BorderBox>
            <div className="flex items-center justify-between">
              <SubTitle>Best Seller Brand</SubTitle>
              <div className="flex items-center gap-3 ">
                <BaseDatePicker />
              </div>
            </div>
            <div className="relative h-72">
              <BasePieChart />
              <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-custom_text_four">
                <h5 className="text-xl font-medium text-custom_text_one">
                  SR 50,000
                </h5>
                <span className="text-xs font-light text-custom_text_ten">
                  Total Volume
                </span>
              </div>
            </div>
          </BorderBox>
        </div>
        {/* charts 2*/}
        <div className="col-span-12 lg:col-span-8">
          <SalesVsCities />
        </div>
        <div className="col-span-12 lg:col-span-4">
          {/* <BorderBox>
            <div className="flex items-center justify-between">
              <SubTitle>Top Clients</SubTitle>
              <div className="flex items-center gap-3">
                <BaseDatePicker />
              </div>
            </div>
            <div className="h-72">
              <Table query={query} />
            </div>
          </BorderBox> */}
          <TopClients />
        </div>
        {/* heading 2*/}
        <div className="col-span-12">
          <Title>Inventory</Title>
        </div>
        {/* charts 3*/}
        <div className="col-span-12 lg:col-span-8">
          <BorderBox>
            <div className="flex items-center justify-between mb-3">
              <SubTitle>Brands Inventory</SubTitle>
              <div className="flex items-center gap-3">
                <BaseMenu
                  text="select month"
                  data={monthsData}
                  value={months}
                  setValue={setMonths}
                />
                {/* <ExportButton /> */}
              </div>
            </div>
            <div className="h-72">{/* <BaseBarChart /> */}</div>
          </BorderBox>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <BorderBox>
            <div className="flex items-center justify-between">
              <SubTitle>Lowest Stock</SubTitle>
              <div className="flex items-center gap-3">
                <BaseDatePicker />
              </div>
            </div>
            <div className="h-72">
              <Table query={query} />
            </div>
          </BorderBox>
        </div>
        <div className="col-span-12">
          <BorderBox>
            <div className="flex items-center justify-between">
              <SubTitle>Total Inventory</SubTitle>
              <div className="flex items-center gap-3">
                <BaseMenu
                  text="select month"
                  data={monthsData}
                  value={months}
                  setValue={setMonths}
                />
                {/* <ExportButton /> */}
              </div>
            </div>
            <div className="h-72">
              <Table query={query1} />
            </div>
          </BorderBox>
        </div>
        {/* heading 3*/}
        {/* <div className="col-span-12">
          <Title>Marketing</Title>
        </div> */}
        {/* charts 4*/}
        {/* <div className="col-span-12 lg:col-span-8">
          <BorderBox>
            <div className="flex items-center justify-between mb-3">
              <SubTitle>Brand Marketing</SubTitle>
              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                  <BaseMenu
                    text="select brand"
                    data={brands}
                    value={brand}
                    setValue={(item) => setBrand(item)}
                  />
                </div>
                <BaseMenu
                  text="select month"
                  data={monthsData}
                  value={months}
                  setValue={setMonths}
                />
                
              </div>
            </div>
            <div className="h-72"></div>
          </BorderBox>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <BorderBox>
            <div className="flex items-center justify-between">
              <SubTitle>Highest Expenses</SubTitle>
              <div className="flex items-center gap-3">
                <BaseDatePicker />
              </div>
            </div>
            <div className="h-72">
              <Table query={query} />
            </div>
          </BorderBox>
        </div> */}
      </div>
    </div>
  );
}
