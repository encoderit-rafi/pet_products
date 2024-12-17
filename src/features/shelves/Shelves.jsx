import Title from "@/components/Title";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import demoData from "@/lib/data/demo";
import BorderBox from "@/components/BorderBox";
import Table from "@/components/Table";
import BaseButton from "@/components/BaseButton";
import ImagePicker from "@/components/ImagePicker";
import { useEffect, useState } from "react";
import Dialog from "@/components/Dialog";
import BaseMenu from "@/components/BaseMenu";
import BaseSelectDropdown from "@/components/BaseSelectDropdown";
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
    name: 'Stands'
  },
  {
    id: 1,
    name: 'Stand Type'
  },
  {
    id: 2,
    name: 'POS Material'
  },
]
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
  useEffect(() => {
    console.log(activeTabIndex)
  }, [activeTabIndex])
  function handelOpenModal() {
    switch (activeTabIndex) {
      case 0:
        setIsOpenAddNewStand(true)
        return;
      default:
        return;
    }
  }
  return <div className="flex flex-col h-full gap-4 text-custom_bg_three">
    <TabGroup
      selectedIndex={activeTabIndex}
      onChange={setActiveTabIndex} >
      <div className="flex items-center justify-between">
        <Title>Shelves</Title>
        <div className="flex flex-1 items-center gap-4">
          <TabList className="ml-auto" >
            {
              tabs.map(tab =>
                <Tab key={tab.id} className="border-b-2 text-xs border-b-slate-400 data-[selected]:border-b-custom_bg_three data-[selected]:text-custom_bg_three p-3 focus:outline-none">
                  {tab.name}
                </Tab>
              )
            }
          </TabList>
          <BaseButton varient="orange" icon="plus"
            className="max-w-24 text-xs"
            onClick={handelOpenModal}
          >add new</BaseButton>
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
    <Dialog isOpen={isOpenAddNewStand} title="add new stand" className="max-w-lg">
      <div className="flex flex-col  space-y-4">
        <ImagePicker />

        <BaseMenu
          text="select brand"
          data={brands}
          value={brand}
          setValue={(item) => setBrand(item)}
          className="bg-transparent py-3 rounded-lg"
        />
        <BaseSelectDropdown />
        <div className="flex items-center gap-4">
          <BaseButton
            onClick={() => setIsOpenAddNewStand(false)}
          >cancel</BaseButton>
          <BaseButton varient="gradient">confirm</BaseButton>
        </div>
      </div>
    </Dialog>
  </div>
}
