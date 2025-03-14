import { useState } from "react";
import demoData from "@/lib/data/demo";
import Table from "@/components/tables/Table";
import BorderBox from "@/components/box/BorderBox";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import InputTextArea from "@/components/inputs/InputTextArea";
import BaseInput from "@/components/inputs/BaseInput";
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

export default function Task() {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);

  return (
    <>
      {/* // <Page
    //   className={"bg-red-400"}
    //   title={
    //     <div className="flex items-center gap-4 ">
    //       <NavLink to="/marketing">
    //         <div className="size-8 lg:size-10">
    //           <BackButton />
    //         </div>
    //       </NavLink>

    //       <Title>tasks</Title>
    //     </div>
    //   }
    //   actions={
    //     <BaseButton variant="gradient" className="px-4 text-xs font-medium">
    //       save settings
    //     </BaseButton>
    //   }
    // > */}
      <BorderBox className={"overflow-hidden"}>
        {/* className={"flex flex-col flex-1 overflow-hidden "} */}
        <Table query={query} />
      </BorderBox>
      {/* <Dialog
        isOpen={isOpenAddNewTask}
        title="add new task"
        className="max-w-lg"
      >
        <div className="flex flex-col mt-4 space-y-4">
          <BaseInput
            id="task_name"
            label="task name"
            palceholder="enter value"
          />
          <BaseInput id="cost" label="cost" palceholder="enter value" />
          <InputTextArea
            id="description"
            label="Description"
            placeholder="enter value"
          />
          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenAddNewTask(false)}>
              cancel
            </BaseButton>
            <BaseButton variant="gradient">confirm</BaseButton>
          </div>
        </div>
      </Dialog> */}
      {/* // </Page> */}
    </>
  );
}
