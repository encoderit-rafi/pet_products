import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import BaseButton from "@/components/buttons/BaseButton";
import Page from "@/components/ui/Page";
import BaseTabList from "@/components/tabs/BaseTabList";
import RoleTab from "./RoleTab";
import UserTab from "./UserTab";
const tabs = [
  {
    id: 0,
    name: "Users",
    value: "users",
  },
  {
    id: 1,
    name: "Roles",
    value: "roles",
  },
];
export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenRole, setIsOpenRole] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );

  useEffect(() => {
    setActiveTabIndex(activeTab.id);
  }, [activeTab]);
  useEffect(() => {
    setActiveTab(
      searchParams.get("type") == null
        ? tabs[0]
        : tabs.find((tab) => tab.value == searchParams.get("type"))
    );
  }, [searchParams.get("type")]);
  function handelOpenModal() {
    switch (activeTabIndex) {
      case 0:
        setIsOpenUser(true);
        return;
      case 1:
        setIsOpenRole(true);
        return;
      default:
        return;
    }
  }

  return (
    <TabGroup
      selectedIndex={activeTabIndex}
      onChange={setActiveTabIndex}
      className={"h-full"}
    >
      <Page
        title={`Assigned ${activeTab.name}`}
        actions={
          <div className="flex flex-row items-center flex-1 gap-4">
            <BaseTabList
              list={tabs}
              activeTab={activeTab}
              className={{ tabList: "ml-auto" }}
              handelOnChangeTab={(item) => {
                setSearchParams({ type: item.value });
              }}
            />
            <BaseButton
              variant="orange"
              icon="plus"
              className="px-3 text-xs max-w-fit lg:px-5"
              onClick={handelOpenModal}
            >
              <span className="hidden lg:block">add new</span>
            </BaseButton>
          </div>
        }
      >
        <div className="flex flex-col flex-1 overflow-auto">
          <TabPanels className="flex flex-col flex-1">
            <TabPanel className={"flex flex-col flex-1"}>
              <UserTab isOpenUser={isOpenUser} setIsOpenUser={setIsOpenUser} />
            </TabPanel>
            <TabPanel className={"flex flex-col flex-1"}>
              <RoleTab isOpenRole={isOpenRole} setIsOpenRole={setIsOpenRole} />
            </TabPanel>
          </TabPanels>
        </div>
      </Page>
    </TabGroup>
  );
}
