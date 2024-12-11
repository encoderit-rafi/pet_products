import demoData from "@/lib/data/demo";
import Table from "@/components/Table";
import BorderBox from "@/components/BorderBox";
import PlaceholderImage from "@/components/PlaceholderImage";
import BackButton from "@/components/BackButton";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import ButtonWithIcon from "@/components/ButtonWithIcon";
import ButtonGradient from "@/components/ButtonGradient";
import Title from "@/assets/icons/Title";

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
          <ButtonWithIcon />
          <ButtonGradient className="px-4 text-xs font-medium">
            save settings
          </ButtonGradient>
        </div>
      </div>
      <BorderBox>
        <Table query={query} />
      </BorderBox>
    </div>
  );
}
