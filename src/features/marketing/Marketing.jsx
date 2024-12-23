import { useState } from "react";
import demoData from "@/lib/data/demo";
import Table from "@/components/tables/Table";
import BorderBox from "@/components/box/BorderBox";
import BackButton from "@/components/buttons/BackButton";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import Title from "@/components/texts/Title";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/popups/Dialog";
import InputText from "@/components/inputs/InputText";
import InputTextArea from "@/components/inputs/InputTextArea";
import { NavLink } from "react-router-dom";
import FilterIcon from "@/assets/icons/FilterIcon";
import BaseMenu from "@/components/menus/BaseMenu";
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
        return (
          <div className="flex items-center gap-3">
            {/* <div className="size-5">
              <PlaceholderImage />
            </div> */}
            <span>{row.name}</span>
          </div>
        );
      },
    },
    {
      name: "task ID",
      value: "task_id",
      cellValue: (row) => {
        return row?.sku;
      },
    },
    {
      name: "cost",
      value: "cost",
      cellValue: (row) => {
        return row?.brand;
      },
    },
    {
      name: "description",
      value: "description",
      cellValue: (row) => {
        return <span className="truncate">{row?.category}</span>;
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

export default function Marketing() {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false)
  const [brand, setBrand] = useState(null);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center gap-6">
          <div className="size-10">
            <BackButton />
          </div>

        </div> */}
        <Title>Marketing</Title>
        <div className="flex items-center gap-4">
          <NavLink
            to="/marketing/task"
          >
            <BaseButton className="px-4 text-xs font-normal">
              tasks
            </BaseButton>
          </NavLink>
          <NavLink
            to="/marketing/criteria_and_segment"
          >
            <BaseButton varient="orange" className="px-4 text-xs font-normal">
              Criteria and Segment
            </BaseButton>
          </NavLink>
          <BaseMenu
            text="sort by"
            data={brands}
            value={brand}
            setValue={(item) => setBrand(item)}
            className="border-t-transparent border-b-transparent rounded-none pt-0 pb-0 px-4 text-xs border-l-gray-500 border-r-gray-500"
          />
          <FilterIcon className="size-4 text-white" />
        </div>
      </div>
      <BorderBox>
        <Table query={query} />
      </BorderBox>
      <Dialog isOpen={isOpenAddNewTask} title="add new task" className="max-w-lg">
        <div className="flex flex-col  space-y-4">
          <InputText id="task_name" label="task name" palceholder="enter value" />
          <InputText id="cost" label="cost" palceholder="enter value" />
          <InputTextArea id="description" label="Description" placeholder="enter value" />
          <div className="flex items-center gap-4">
            <BaseButton
              onClick={() => setIsOpenAddNewTask(false)}
            >cancel</BaseButton>
            <BaseButton varient="gradient">confirm</BaseButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
