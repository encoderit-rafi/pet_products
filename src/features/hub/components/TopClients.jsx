import BorderBox from "@/components/box/BorderBox"
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import InputSearch from "@/components/inputs/InputSearch";
import Table from "@/components/tables/Table"
import SubTitle from "@/components/texts/SubTitle"
import { ranges } from "@/consts";
import React, { useState } from 'react'
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
const query = {
 headers: [
  {
   name: "SAP Code",
   value: "name",
   cellValue: (row) => {
    return row.name;
   },
  },
  {
   name: "name",
   value: "name",
   cellValue: (row) => {
    return row.name;
   },
  },
  {
   name: "Quantity",
   value: "sku",
   cellValue: (row) => {
    return row?.sku;
   },
  },
  {
   name: "Sales Amount",
   value: "brand",
   cellValue: (row) => {
    return row?.brand;
   },
  },
 ],
 isLoading: false,
 data: demoData,
};
export default function TopClients() {
 const [range, setRange] = useState(() => ranges[0]);

 return (
  <BorderBox>
   <div className="flex items-center justify-between">
    <SubTitle>Top Clients</SubTitle>
    <div className="flex items-center gap-1">

     <InputSearch className="ml-auto w-20" />
     <BaseDropdown
      variant="rounded"
      options={ranges}
      selected={[range]}
      setSelected={(data) => {
       data?.id != range?.id &&
        setRange(data)

      }}
     />
    </div>
   </div>
   <div className="h-72">
    <Table query={query} />
   </div>
  </BorderBox>
 )
}
