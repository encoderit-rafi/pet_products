import { useState } from "react";
import demoData from "@/lib/data/demo";
import Table from "@/components/tables/Table";
import BorderBox from "@/components/box/BorderBox";
import BackButton from "@/components/buttons/BackButton";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import Title from "@/components/texts/Title";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import InputText from "@/components/inputs/InputText";
import InputTextArea from "@/components/inputs/InputTextArea";
import { NavLink } from "react-router-dom";
import FilterIcon from "@/assets/icons/FilterIcon";
import BaseMenu from "@/components/menus/BaseMenu";
import SubTitle from "@/components/texts/SubTitle";
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
const data = [
  {
    name: "Name",
    value: "Product Name",
  },
  {
    name: "SKU",
    value: "475827364",
  },
  {
    name: "Brand",
    value: "Brand Here",
  },
  {
    name: "Category",
    value: "Women Shoes",
  },
  {
    name: "Total Units Sold",
    value: "137,548 Units",
  },
  {
    name: "Total Sales Value",
    value: "SR 850,000.00",
  },
  {
    name: "Criteria Category",
    value: "Category A",
  },
];
const dataPerMonth = [
  {
    name: "Jan.21",
    value: [
      {
        data: ["A", "B"],
        task: [{ name: "task 1" }],
      },
    ],
  },
  {
    name: "Feb.21",
    value: [
      {
        data: ["B", "C"],
        task: [],
      },
    ],
  },
  {
    name: "Mar.21",
    value: [
      {
        data: ["A", "C"],
        task: [],
      },
    ],
  },
  {
    name: "Apr.21",
    value: [
      {
        data: ["A", "B"],
        task: [{ name: "task 1" }],
      },
    ],
  },
  {
    name: "May.21",
    value: [
      {
        data: ["A", "B"],
      },
    ],
  },
  {
    name: "Jun.21",
    value: [
      {
        data: ["B", "C"],
      },
    ],
  },
  {
    name: "Jul.21",
    value: [
      {
        data: ["A", "B"],
      },
    ],
  },
  {
    name: "Aug.21",
    value: [
      {
        data: ["A", "B"],
      },
    ],
  },
  {
    name: "Sep.21",
    value: [
      {
        data: ["A", "B"],
      },
    ],
  },
  {
    name: "Oct.21",
    value: [
      {
        data: ["A", "B"],
      },
    ],
  },
  {
    name: "Nov.21",
    value: [
      {
        data: ["A", "B"],
      },
    ],
  },
  {
    name: "Dec.21",
    value: [
      {
        data: ["A", "B"],
      },
    ],
  },
  {
    name: "Jan.22",
    value: [
      {
        data: ["A", "B"],
      },
    ],
  },
];
const query = {
  headers: [
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
  ],
  isLoading: false,
  data: demoData,
};
export default function Marketing() {
  const [brand, setBrand] = useState(null);
  const [isOpenTasksApplied, setIsOpenTasksApplied] = useState(false);
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Title>Marketing</Title>
          <div className="flex items-center gap-4">
            <div className="items-center hidden gap-4 lg:flex">
              <NavLink to="/marketing/task">
                <BaseButton className="px-4 text-xs font-normal">
                  tasks
                </BaseButton>
              </NavLink>
              <NavLink to="/marketing/criteria_and_segment">
                <BaseButton
                  variant="orange"
                  className="px-4 text-xs font-normal"
                >
                  Criteria and Segment
                </BaseButton>
              </NavLink>
            </div>
            <BaseMenu
              text="sort by"
              data={brands}
              value={brand}
              setValue={(item) => setBrand(item)}
              className="px-4 pt-0 pb-0 text-xs rounded-none border-t-transparent border-b-transparent border-l-gray-500 border-r-gray-500"
            />
            <FilterIcon className="text-white size-4" />
          </div>
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <NavLink to="/marketing/task" className="flex-1">
            <BaseButton className="px-4 text-xs font-normal">tasks</BaseButton>
          </NavLink>
          <NavLink to="/marketing/criteria_and_segment" className="flex-1">
            <BaseButton variant="orange" className="px-4 text-xs font-normalc">
              Criteria and Segment
            </BaseButton>
          </NavLink>
        </div>
      </div>
      <BorderBox className="p-2 overflow-hidden h-fit lg:p-2">
        <div className="flex items-center justify-between gap-5 ">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover object-center rounded-lg size-12"
          />
          <div className="flex items-center justify-between flex-1 gap-3 overflow-x-auto">
            {data.map((item, i) => (
              <div key={i} className="space-y-1 shrink-0">
                <SubTitle className="text-sm font-extralight">
                  {item.name}
                </SubTitle>
                <Title className="!text-sm font-light">{item.value}</Title>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
              <EditIcon className="size-3" />
            </div>
            <div className="flex items-center justify-center p-2 border rounded-lg bg-custom_bg_eight siz-10 border-custom_line_two">
              <DeleteIcon className="size-3" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-3 overflow-x-auto">
          {dataPerMonth.map((data, i) => (
            <div key={i} className="">
              <div className="relative flex gap-2">
                {data.value.map((item, i) =>
                  item.data.map((val) => (
                    <>
                      <div
                        key={i}
                        className="py-2 text-white bg-red-500/35 px-7 rounded-xl"
                      >
                        {val}
                      </div>
                      {item?.task?.length > 0 && (
                        <button
                          className="absolute bg-lime-500 rounded-full py-1 px-3 top-1/2 left-1/2 text-[10px] -translate-x-1/2 -translate-y-1/2"
                          onClick={() => setIsOpenTasksApplied(true)}
                        >
                          Task
                        </button>
                      )}
                    </>
                  ))
                )}
              </div>
              {data.name}
            </div>
          ))}
        </div>
      </BorderBox>
      <Dialog
        title="Tasks Applied"
        isOpen={isOpenTasksApplied}
        className="max-w-96"
      >
        <div className="mt-4">
          <Table query={query} />

          <div className="flex items-center gap-4 mt-5">
            <BaseButton
              className="text-sm font-medium"
              onClick={() => setIsOpenTasksApplied(false)}
            >
              done
            </BaseButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
