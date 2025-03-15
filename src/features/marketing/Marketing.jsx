import { useEffect, useState } from "react";
import demoData from "@/lib/data/demo";
import { useSearchParams } from "react-router-dom";
import BaseTabList from "@/components/tabs/BaseTabList";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import Page from "@/components/ui/Page";
import { CriteriaAndSegment, Task } from ".";
import MarketingActivities from "./marketing_activities/MarketingActivities";
import MarketingCategories from "./marketing_categories/MarketingCategories";
import MarketingPlatforms from "./marketing_platforms/MarketingPlatforms";
const tabs = [
  {
    id: 0,
    name: "Tasks",
    value: "tasks",
  },
  {
    id: 1,
    name: "Criteria And Segment",
    value: "criteria_and_segment",
  },
  {
    id: 2,
    name: "Marketing Activities",
    value: "marketing_activities",
  },
  {
    id: 3,
    name: "Marketing Categories",
    value: "marketing_categories",
  },
  {
    id: 4,
    name: "Marketing Platforms",
    value: "marketing_platforms",
  },
];

export default function Marketing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );
  useEffect(() => {
    setActiveTabIndex(activeTab?.id);
  }, [activeTab]);
  useEffect(() => {
    setActiveTab(
      searchParams.get("type") == null
        ? tabs[0]
        : tabs.find((tab) => tab.value == searchParams.get("type"))
    );
  }, [searchParams.get("type")]);
  // function handelOpenModal() {
  //   switch (activeTabIndex) {
  //     case 0:
  //       setIsOpenAddNewStand(true);
  //       return;
  //     case 1:
  //       setIsOpenAddNewStandType(true);
  //       return;
  //     case 2:
  //       setIsOpenAddNewPOSMaterials(true);
  //       return;
  //     default:
  //       return;
  //   }
  // }
  return (
    <TabGroup
      selectedIndex={activeTabIndex}
      onChange={setActiveTabIndex}
      className={"h-full flex flex-col "}
    >
      <Page
        title="Marketing"
        actions={
          <BaseTabList
            list={tabs}
            activeTab={activeTab}
            className={{ tabList: "mx-auto" }}
            handelOnChangeTab={(item) => {
              setSearchParams({ type: item.value });
            }}
          />
          //   <BaseMenu
          //   text="sort by"
          //   data={brands}
          //   value={brand}
          //   setValue={(item) => setBrand(item)}
          //   className="px-4 pt-0 pb-0 text-xs rounded-none border-t-transparent border-b-transparent border-l-custom_line_one border-r-custom_line_one"
          // />
          // <FilterIcon className="text-custom_text_two size-4" />
        }
      >
        <div className="flex-1 flex flex-col overflow-hidden ">
          <TabPanels className="flex-1 flex flex-col overflow-hidden">
            <TabPanel className={"flex-1 flex flex-col overflow-hidden"}>
              <Task />
            </TabPanel>
            <TabPanel className={"flex-1 flex flex-col overflow-hidden"}>
              <CriteriaAndSegment />
            </TabPanel>
            <TabPanel className={"flex-1 flex flex-col overflow-hidden"}>
              <MarketingActivities />
            </TabPanel>
            <TabPanel className={"flex-1 flex flex-col overflow-hidden"}>
              <MarketingCategories />
            </TabPanel>
            <TabPanel className={"flex-1 flex flex-col overflow-hidden"}>
              <MarketingPlatforms />
            </TabPanel>
          </TabPanels>
        </div>
      </Page>
    </TabGroup>
  );
}
