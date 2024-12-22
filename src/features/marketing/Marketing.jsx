import demoData from "@/lib/data/demo";
import Table from "@/components/tables/Table";
import BorderBox from "@/components/box/BorderBox";
import BackButton from "@/components/buttons/BackButton";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import Title from "@/components/texts/Title";
import BaseButton from "@/components/buttons/BaseButton";
import { useState } from "react";
import Dialog from "@/components/popups/Dialog";
import InputText from "@/components/inputs/InputText";
import InputTextArea from "@/components/inputs/InputTextArea";
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

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="size-10">
            <BackButton />
          </div>

          <Title>tasks</Title>
        </div>
        <div className="flex items-center gap-4">
          {/* <ButtonWithIcon /> */}
          <BaseButton varient="orange" icon="plus" className="px-4 text-xs font-medium" onClick={() => setIsOpenAddNewTask(true)}>
            add new
          </BaseButton>
          <BaseButton varient="gradient" className="px-4 text-xs font-medium">
            save settings
          </BaseButton>
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
