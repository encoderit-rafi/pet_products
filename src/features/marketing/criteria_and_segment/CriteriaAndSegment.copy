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
import Dialog from "@/components/dialogs/Dialog";
import InputText from "@/components/inputs/InputText";
import InputTextArea from "@/components/inputs/InputTextArea";
import { NavLink } from "react-router-dom";
import BaseMenu from "@/components/menus/BaseMenu";
import ExportButton from "@/components/buttons/ExportButton";
import SubTitle from "@/components/texts/SubTitle";
import Label from "@/components/texts/Label";
import BaseSelectDropdown from "@/components/dropdowns/BaseSelectDropdown";
import MultiSelectListbox from "@/components/dropdowns/MultiSelectListbox";
import BaseInput from "@/components/inputs/BaseInput";
import Page from "@/components/ui/Page";
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
  const [category, setCategory] = useState(null);
  const [isOpenAddNewCriteria, setIsOpenAddNewCriteria] = useState(false);
  const [isOpenAddNewSegment, setIsOpenAddNewSegment] = useState(false);

  return (
    <Page
      title={
        <div className="flex items-center gap-4">
          <NavLink to="/marketing">
            <div className="size-8 lg:size-10">
              <BackButton />
            </div>
          </NavLink>

          <Title>Criteria and Segment</Title>
        </div>
      }
      actions={
        <BaseButton variant="gradient" className="px-4 text-xs font-medium">
          save settings
        </BaseButton>
      }
    >
      <div className="flex-1 grid grid-cols-1 gap-4 xl:grid-cols-2 overflow-hidden">
        <BorderBox className={"overflow-hidden"}>
          <div className="flex flex-col gap-4 mb-2">
            <div className="flex items-center justify-between ">
              <SubTitle>Criteria</SubTitle>
              <div className="flex items-center gap-3">
                <BaseMenu
                  text="select category"
                  data={categories}
                  value={category}
                  setValue={(item) => setCategory(item)}
                />
                <div className="items-center hidden gap-3 lg:flex">
                  <BaseButton
                    variant="orange"
                    className="lg:text-xs font-extralight py-1.5 px-3 rounded-full lg:rounded-full border border-custom_orange"
                    onClick={() => setIsOpenAddNewCriteria(true)}
                  >
                    add new
                  </BaseButton>
                  <ExportButton />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:hidden">
              <BaseButton
                variant="orange"
                className=" text-[11px]  py-1.5 px-3 rounded-full lg:rounded-full"
                onClick={() => setIsOpenAddNewCriteria(true)}
              >
                add new
              </BaseButton>
              <ExportButton />
            </div>
          </div>
          <Table query={query} />
        </BorderBox>
        <BorderBox className={"overflow-hidden"}>
          <div className="flex flex-col gap-4 mb-2">
            <div className="flex items-center justify-between ">
              <SubTitle>Segment </SubTitle>

              <div className="flex items-center gap-3">
                <BaseMenu
                  text="select category"
                  data={categories}
                  value={category}
                  setValue={(item) => setCategory(item)}
                />
                <div className="items-center hidden gap-3 lg:flex">
                  <BaseButton
                    variant="orange"
                    className="lg:text-xs font-extralight py-1.5 px-3 rounded-full lg:rounded-full border border-custom_orange"
                    onClick={() => setIsOpenAddNewSegment(true)}
                  >
                    add new
                  </BaseButton>
                  <ExportButton />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:hidden">
              <BaseButton
                variant="orange"
                className=" text-[11px]  py-1.5 px-3 rounded-full lg:rounded-full"
                onClick={() => setIsOpenAddNewCriteria(true)}
              >
                add new
              </BaseButton>
              <ExportButton />
            </div>
          </div>
          <Table query={query} />
        </BorderBox>
      </div>

      <Dialog
        isOpen={isOpenAddNewCriteria}
        title="Add New Criteria"
        className="max-w-lg"
      >
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Label id="brand" label="brand" palceholder="brand" />
            <BaseSelectDropdown />
          </div>
          <div className="space-y-2">
            <Label id="Category" label="Category" palceholder="Category" />
            <MultiSelectListbox />
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-2">
              <Label id="A Percent" label="A Percent" palceholder="A Percent" />
              <BaseSelectDropdown />
            </div>
            <div className="flex-1 space-y-2">
              <Label id="B Percent" label="B Percent" palceholder="B Percent" />
              <BaseSelectDropdown />
            </div>
            <div className="flex-1 space-y-2">
              <Label id="C Percent" label="C Percent" palceholder="C Percent" />
              <BaseSelectDropdown />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenAddNewCriteria(false)}>
              cancel
            </BaseButton>
            <BaseButton variant="gradient">confirm</BaseButton>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isOpenAddNewSegment}
        title="Add New Segment"
        className="max-w-lg"
      >
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Label id="brand" label="brand" palceholder="brand" />
            <BaseSelectDropdown />
          </div>
          <div className="space-y-2">
            <Label id="Category" label="Category" palceholder="Category" />
            <MultiSelectListbox />
          </div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="space-y-2">
              <Label id="ABC" label="ABC" palceholder="ABC" />
              <BaseSelectDropdown />
            </div>
            <div className="space-y-2">
              <Label id="Color Tag" label="Color Tag" palceholder="Color Tag" />
              <BaseSelectDropdown />
            </div>
            <BaseInput
              id="Volume min"
              label="Volume min"
              palceholder="Volume min"
              type="number"
            />
            <BaseInput
              id="Volume max"
              label="Volume max"
              palceholder="Volume max"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label id="Tasks" label="Tasks" palceholder="Tasks" />
            <MultiSelectListbox />
          </div>
          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenAddNewSegment(false)}>
              cancel
            </BaseButton>
            <BaseButton variant="gradient">confirm</BaseButton>
          </div>
        </div>
      </Dialog>
    </Page>
  );
}
