// CriteriaAndSegment
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
import BaseMenu from "@/components/menus/BaseMenu";
import ExportButton from "@/components/buttons/ExportButton";
import SubTitle from "@/components/texts/SubTitle";
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
export default function CriteriaAndSegment() {
  const [department, setDepartment] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false)

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <NavLink
            to="/marketing"
          >

            <div className="size-10">
              <BackButton />
            </div>
          </NavLink>

          <Title>Criteria and Segment</Title>
        </div>
        <div className="flex items-center gap-4">
          {/* <ButtonWithIcon /> */}
          {/* <BaseButton varient="orange" icon="plus" className="px-4 text-xs font-medium" onClick={() => setIsOpenAddNewTask(true)}>
            add new
          </BaseButton> */}
          <BaseButton varient="gradient" className="px-4 text-xs font-medium">
            save settings
          </BaseButton>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

        <BorderBox>
          <div className="flex items-center justify-between mb-4">
            <SubTitle>Criteria</SubTitle>
            <div className="flex items-center gap-3">
              {/* <BaseMenu
                text="select department"
                data={departments}
                value={department}
                setValue={(item) => setDepartment(item)}
              /> */}
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
              <BaseButton varient="orange" className="bg-custom_orange border font-normal w-fit border-custom_orange text-[11px] text-white capitalize py-1.5 px-3 rounded-full" onClick={() => setIsOpenAddNewTask(true)}>
                add new
              </BaseButton>
              <ExportButton />
            </div>
          </div>
          <Table query={query} />
        </BorderBox>
        <BorderBox>
          <div className="flex items-center justify-between mb-4">
            <SubTitle>Segment </SubTitle>
            <div className="flex items-center gap-3">
              {/* 
              <BaseMenu
                text="select department"
                data={departments}
                value={department}
                setValue={(item) => setDepartment(item)}
              /> */}
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
          <Table query={query} />
        </BorderBox>
      </div>
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
