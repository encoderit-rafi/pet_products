import React, { useState } from "react";
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
import Drawer from "@/components/navigators/Drawer";
import BaseButton from "@/components/buttons/BaseButton";
import LinkedinIcon from "@/assets/icons/LinkedinIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import MessageIcon from "@/assets/icons/MessageIcon";

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
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <Title onClick={() => setIsOpenDrawer(true)}>dashboard</Title>
        <div className="flex items-center gap-3">
          <div className="w-[111px]">
            <InputSearch />
          </div>
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
      <Drawer isOpen={isOpenDrawer} className="max-w-96 flex flex-col">
        <Title>Application Support</Title>
        <div className="flex-1 overflow-y-auto mt-5 space-y-3">
          <BorderBox className="px-3 py-4 h-fit">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg h-16"
              />

              <div className="flex flex-col justify-between flex-1 capitalize h-16">
                <p className="text-sm font-medium text-custom_text_four">
                  m. khalid saied
                </p>
                <p className="text-xs text-gray-400">role here</p>
                <div className="flex items-center gap-3 text-yellow-500">
                  <LinkedinIcon className="size-4" />
                  <FacebookIcon className="size-4" />
                  <WhatsappIcon className="size-4" />
                  <MessageIcon className="size-4" />
                  <PhoneIcon className="size-4" />

                </div>
              </div>
            </div>
          </BorderBox>
          <BorderBox className="px-3 py-4 h-fit">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg h-16"
              />

              <div className="flex flex-col justify-between flex-1 capitalize h-16">
                <p className="text-sm font-medium text-custom_text_four">
                  m. khalid saied
                </p>
                <p className="text-xs text-gray-400">role here</p>
                <div className="flex items-center gap-3 text-yellow-500">
                  <LinkedinIcon className="size-4" />
                  <FacebookIcon className="size-4" />
                  <WhatsappIcon className="size-4" />
                  <MessageIcon className="size-4" />
                  <PhoneIcon className="size-4" />

                </div>
              </div>
            </div>
          </BorderBox>
          <BorderBox className="px-3 py-4 h-fit">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg h-16"
              />

              <div className="flex flex-col justify-between flex-1 capitalize h-16">
                <p className="text-sm font-medium text-custom_text_four">
                  m. khalid saied
                </p>
                <p className="text-xs text-gray-400">role here</p>
                <div className="flex items-center gap-3 text-yellow-500">
                  <LinkedinIcon className="size-4" />
                  <FacebookIcon className="size-4" />
                  <WhatsappIcon className="size-4" />
                  <MessageIcon className="size-4" />
                  <PhoneIcon className="size-4" />

                </div>
              </div>
            </div>
          </BorderBox>
          <BorderBox className="px-3 py-4 h-fit">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg h-16"
              />

              <div className="flex flex-col justify-between flex-1 capitalize h-16">
                <p className="text-sm font-medium text-custom_text_four">
                  m. khalid saied
                </p>
                <p className="text-xs text-gray-400">role here</p>
                <div className="flex items-center gap-3 text-yellow-500">
                  <LinkedinIcon className="size-4" />
                  <FacebookIcon className="size-4" />
                  <WhatsappIcon className="size-4" />
                  <MessageIcon className="size-4" />
                  <PhoneIcon className="size-4" />

                </div>
              </div>
            </div>
          </BorderBox>

        </div>
        <BaseButton onClick={() => setIsOpenDrawer(false)} className="mt-10">
          done</BaseButton>
      </Drawer>
    </div>
  );
}
