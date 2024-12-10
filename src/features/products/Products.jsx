import React, { useState } from "react";
import demoData from "@/lib/data/demo";
import Table from "@/components/Table";
import BaseMenu from "@/components/BaseMenu";
import ExportButton from "@/components/ExportButton";
import BorderBox from "@/components/BorderBox";
import PlaceholderImage from "@/components/PlaceholderImage";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import InputSearch from "@/components/InputSearch";

const query = {
  headers: [
    {
      name: "name",
      value: "name",
      cellValue: (row) => {
        return (
          <div className="flex items-center gap-3">
            <div className="size-8">
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
          <div className="flex flex-row-reverse gap-3 text-yellow-400">
            <DeleteIcon className={"size-5"} />
            <EditIcon className={"size-5"} />
          </div>
        );
      },
    },
  ],
  isLoading: false,
  data: demoData,
};
const departments = [
  {
    id: 1,
    name: "department 1",
    value: "department_1",
  },
  {
    id: 2,
    name: "department 2",
    value: "department_2",
  },
  {
    id: 3,
    name: "department 3",
    value: "department_3",
  },
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
  const [department, setDepartment] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">dashboard</h2>
        <div className="flex items-center gap-4">
          <InputSearch />
          <BaseMenu
            text="select department"
            data={departments}
            value={department}
            setValue={(item) => setDepartment(item)}
          />
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
          <ExportButton />
        </div>
      </div>
      <BorderBox>
        <Table query={query} />
      </BorderBox>
    </div>
  );
}
