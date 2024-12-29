import Title from "@/components/texts/Title";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import demoData from "@/lib/data/demo";
import BorderBox from "@/components/box/BorderBox";
import Table from "@/components/tables/Table";
import BaseButton from "@/components/buttons/BaseButton";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import { useEffect, useState } from "react";
import Dialog from "@/components/dialogs/Dialog";
import BaseMenu from "@/components/menus/BaseMenu";
import BaseSelectDropdown from "@/components/dropdowns/BaseSelectDropdown";
import Label from "@/components/texts/Label";
import InputText from "@/components/inputs/InputText";
import MultiSelectListbox from "@/components/dropdowns/MultiSelectListbox";
import CustomPhoneInput from "@/components/inputs/InputPhoneNumber";
const query = {
  headers: [
    {
      name: "brand",
      value: "name",
      cellValue: (row) => row.name,
    },
    {
      name: "stand type",
      value: "sku",
      cellValue: (row) => {
        return row?.sku;
      },
    },
    {
      name: "store",
      value: "brand",
      cellValue: (row) => {
        return row?.brand;
      },
    },
    {
      name: "location",
      value: "category",
      cellValue: (row) => {
        return row?.category;
      },
    },
    {
      name: "images",
      value: "total_units_sold",
      cellValue: (row) => {
        return row?.total_units_sold;
      },
    },
    {
      name: "cost",
      value: "total_units_sold",
      cellValue: (row) => {
        return row?.total_units_sold;
      },
    },
  ],
  isLoading: false,
  data: demoData,
};
const tabs = [
  {
    id: 0,
    name: "Stands",
  },
  {
    id: 1,
    name: "Stand Type",
  },
  {
    id: 2,
    name: "POS Material",
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
export default function Shelves() {
  const [brand, setBrand] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isOpenAddNewStand, setIsOpenAddNewStand] = useState(false);
  const [isOpenAddNewStandType, setIsOpenAddNewStandType] = useState(false);
  const [isOpenAddNewPOSMaterials, setIsOpenAddNewPOSMaterials] =
    useState(false);
  useEffect(() => {
    console.log(activeTabIndex);
  }, [activeTabIndex]);
  function handelOpenModal() {
    switch (activeTabIndex) {
      case 0:
        setIsOpenAddNewStand(true);
        return;
      case 1:
        setIsOpenAddNewStandType(true);
        return;
      case 2:
        setIsOpenAddNewPOSMaterials(true);
        return;
      default:
        return;
    }
  }
  return (
    <div className="flex flex-col h-full gap-4 text-custom_bg_three">
      <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
        <div className="flex items-center justify-between">
          <Title>Shelves</Title>
          <div className="flex items-center flex-1 gap-4">
            <TabList className="ml-auto">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  className="border-b-2 text-xs border-b-slate-400 data-[selected]:border-b-custom_bg_three data-[selected]:text-custom_bg_three p-3 focus:outline-none"
                >
                  {tab.name}
                </Tab>
              ))}
            </TabList>
            <BaseButton
              variant="orange"
              icon="plus"
              className="text-xs max-w-24"
              onClick={handelOpenModal}
            >
              add new
            </BaseButton>
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <BorderBox className="mt-4">
              <Table query={query} />
            </BorderBox>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <Dialog
        isOpen={isOpenAddNewStand}
        title="add new stand"
        className="max-w-lg "
      >
        <div className="flex flex-col space-y-4">
          <ImagePicker />
          <div className="overflow-auto max-h-72">
            <div className="space-y-2">
              <Label id="brand" label="brand" palceholder="brand" />
              <BaseSelectDropdown />
            </div>
            <div className="space-y-2">
              <Label
                id="Stand Type"
                label="Stand Type"
                palceholder="Stand Type"
              />
              <BaseSelectDropdown />
            </div>
            <div className="space-y-2">
              <Label
                id="Stand Type"
                label="Stand Type"
                palceholder="Stand Type"
              />
              <BaseSelectDropdown />
            </div>
            <div className="space-y-2">
              <Label id="Store" label="Store" palceholder="Store" />
              <BaseSelectDropdown />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <Label id="Location" label="Location" palceholder="Location" />
                <BaseSelectDropdown />
              </div>
              <div className="flex-1">
                <InputText
                  id="Cost"
                  label="Cost"
                  palceholder="Cost"
                  className="py-3 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenAddNewStand(false)}>
              cancel
            </BaseButton>
            <BaseButton variant="gradient">confirm</BaseButton>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isOpenAddNewStandType}
        title="Add New Stand Type"
        className="max-w-3xl"
      >
        <div className="flex flex-col space-y-4">
          <ImagePicker />
          <div className="grid grid-cols-2 gap-4 overflow-auto max-h-72">
            <MultiSelectListbox />
            <CustomPhoneInput />
            <InputText
              id="Type Name"
              label="Type Name"
              palceholder="Enter Value"
              className="py-3 rounded-lg"
            />
            <InputText
              id="First Shelf"
              label="First Shelf"
              palceholder="Number of Products"
              className="py-3 rounded-lg"
            />
            <div className="space-y-2">
              <Label id="brand" label="brand" palceholder="brand" />
              <BaseSelectDropdown />
            </div>
            <InputText
              id="First Shelf"
              label="First Shelf"
              palceholder="Number of Products"
              className="py-3 rounded-lg"
            />
            <div className="space-y-2">
              <Label
                id="Materials list"
                label="Materials list"
                palceholder="Materials list"
              />
              <BaseSelectDropdown />
            </div>
            <InputText
              id="First Shelf"
              label="First Shelf"
              palceholder="Number of Products"
              className="py-3 rounded-lg"
            />
            <InputText
              id="Cost"
              label="Cost"
              palceholder="Cost"
              className="py-3 rounded-lg"
            />
            <InputText
              id="First Shelf"
              label="First Shelf"
              palceholder="Number of Products"
              className="py-3 rounded-lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenAddNewStandType(false)}>
              cancel
            </BaseButton>
            <BaseButton variant="gradient">confirm</BaseButton>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isOpenAddNewPOSMaterials}
        title="Create POS Materials"
        className="max-w-lg"
      >
        <div className="flex flex-col space-y-4">
          <ImagePicker />
          <div className="space-y-2 overflow-auto max-h-72">
            <InputText
              id="Name"
              label="Name"
              palceholder="Name"
              className="py-3 rounded-lg"
            />

            <div className="space-y-2">
              <Label id="brand" label="brand" palceholder="brand" />
              <BaseSelectDropdown />
            </div>
            <InputText
              id="Cost"
              label="Cost"
              palceholder="Cost"
              className="py-3 rounded-lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenAddNewPOSMaterials(false)}>
              cancel
            </BaseButton>
            <BaseButton variant="gradient">confirm</BaseButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
