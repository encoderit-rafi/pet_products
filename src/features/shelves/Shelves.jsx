import Title from "@/components/texts/Title";
import BorderBox from "@/components/box/BorderBox";
import Table from "@/components/tables/Table";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import BaseTabList from "@/components/tabs/BaseTabList";
import Pagination from "@/components/pagination";
import StandTypeForm from "./components/StandTypeForm";
import POSMaterialsForm from "./components/POSMaterialsForm";
import StandForm from "./components/StandForm";
import { useWindowSize } from "react-use";
import { useSearchParams } from "react-router-dom";
import { useGetAllStands } from "./api/queries/useGetAllStands";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { useGetAllStandTypes } from "./api/queries/useGetAllStandTypes";
import { useGetAllPosMaterials } from "./api/queries/useGetAllPosMaterials";

const tabs = [
  {
    id: 0,
    name: "Stands",
    value: "stands",
  },
  {
    id: 1,
    name: "Stand Type",
    value: "stand-type",
  },
  {
    id: 2,
    name: "POS Material",
    value: "pos-material",
  },
];
export default function Shelves() {
  const { width } = useWindowSize();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: allShelves,
    isLoading: isLoadingAllShelves,
    isFetching: isFetchingAllShelves,
    params: paramsAllShelves,
    setParams: setParamsAllShelves,
  } = useGetAllStands({ isEnabled: true });
  const {
    data: allStandTypes,
    isLoading: isLoadingAllStandTypes,
    isFetching: isFetchingAllStandTypes,
    params: paramsAllStandTypes,
    setParams: setParamsAllStandTypes,
  } = useGetAllStandTypes({ isEnabled: true });
  const {
    data: allPosMaterials,
    isLoading: isLoadingAllPosMaterials,
    isFetching: isFetchingAllPosMaterials,
    params: paramsAllPosMaterials,
    setParams: setParamsAllPosMaterials,
  } = useGetAllPosMaterials({ isEnabled: true });

  const queryShelves = useMemo(
    () => ({
      headers: [
        {
          name: "brand",
          value: "name",
          cellValue: (row) => row?.brand_name || "-",
        },
        {
          name: "stand type",
          value: "stand_type",
          cellValue: (row) => {
            return row?.stand_type_name || "-";
          },
        },
        {
          name: "store",
          value: "store",
          cellValue: (row) => {
            return row.client_name_en;
          },
        },
        {
          name: "location",
          value: "location",
          cellValue: (row) => {
            return row?.location || "-";
          },
        },
        {
          name: "image",
          value: "image",
          cellValue: (row) => {
            return row?.image || "-";
          },
        },
        {
          name: "cost",
          value: "cost",
          cellValue: (row) => {
            return row?.cost || "-";
          },
        },
      ],
      isLoading: isLoadingAllShelves || isFetchingAllShelves,
      data: allShelves?.data || [],
    }),
    [allShelves]
  );

  const queryStandTypes = useMemo(
    () => ({
      headers: [
        {
          name: "brand",
          value: "name",
          cellValue: (row) => row?.brand.name,
        },
        {
          name: "stand type",
          value: "stand_type",
          cellValue: (row) => {
            return row?.name;
          },
        },
        {
          name: "POS materials",
          value: "pos_materials",
          cellValue: (row) => {
            return row?.pos_materials.length > 0 ? "Yes" : "No";
          },
        },
        {
          name: "FS units",
          value: "fs_units",
          cellValue: (row) => {
            return row?.fs_units.length > 0 ? "Yes" : "No";
          },
        },
        {
          name: "shelves",
          value: "shelves",
          cellValue: (row) => {
            return row?.shelves.length > 0 ? "Yes" : "No";
          },
        },

        {
          name: "cost",
          value: "cost",
          cellValue: (row) => {
            return row?.cost ? `SR ${row?.cost}` : "-";
          },
        },
      ],
      isLoading: isLoadingAllStandTypes || isFetchingAllStandTypes,
      data: allStandTypes?.data || [],
    }),
    [allStandTypes]
  );

  const queryPosMaterials = useMemo(
    () => ({
      headers: [
        {
          name: "brand",
          value: "name",
          cellValue: (row) => row?.brand.name,
        },
        {
          name: "POS materials",
          value: "name",
          cellValue: (row) => {
            return row?.name;
          },
        },

        {
          name: "cost",
          value: "cost",
          cellValue: (row) => {
            return row?.cost ? `SR ${row?.cost}` : "-";
          },
        },
      ],
      isLoading: isLoadingAllPosMaterials || isFetchingAllPosMaterials,
      data: allPosMaterials?.data || [],
    }),
    [allPosMaterials]
  );
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );
  const [isOpenAddNewStand, setIsOpenAddNewStand] = useState(false);
  const [isOpenAddNewStandType, setIsOpenAddNewStandType] = useState(false);
  const [isOpenAddNewPOSMaterials, setIsOpenAddNewPOSMaterials] =
    useState(false);
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
  const handlePageChange = useCallback(
    (val) => setParamsAllShelves((old) => ({ ...old, page: val })),
    [setParamsAllShelves]
  );

  const handlePerPageChange = useCallback(
    (val) => setParamsAllShelves((old) => ({ ...old, page: 1, per_page: val })),
    [setParamsAllShelves]
  );
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
      <TabGroup
        selectedIndex={activeTabIndex}
        onChange={setActiveTabIndex}
        className={"flex-1 flex flex-col "}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Title>Shelves</Title>
            <div className="flex flex-row items-center flex-1 gap-4">
              {width > 1024 && (
                <BaseTabList
                  list={tabs}
                  activeTab={activeTab}
                  className={{ tabList: "ml-auto" }}
                  handelOnChangeTab={(item) => {
                    setSearchParams({ type: item.value });
                  }}
                />
              )}

              <BaseButton
                variant="orange"
                icon="plus"
                className="px-3 ml-auto text-xs max-w-fit lg:px-5 lg:ml-0"
                onClick={handelOpenModal}
              >
                <span className="hidden lg:block">add new</span>
              </BaseButton>
            </div>
          </div>
          {width < 1024 && (
            <BaseTabList
              list={tabs}
              activeTab={activeTab}
              className={{ tabList: "mx-auto" }}
              handelOnChangeTab={(item) => {
                setSearchParams({ type: item.value });
              }}
            />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <TabPanels className="flex flex-col flex-1">
            <TabPanel className={"flex flex-col flex-1"}>
              <BorderBox className={"my-4 flex-1"}>
                <Table query={queryShelves} />
              </BorderBox>
              {allShelves?.total > 0 && (
                <Pagination
                  from={allShelves?.from}
                  to={allShelves?.to}
                  total={allShelves?.total}
                  current_page={allShelves?.current_page}
                  last_page={allShelves?.last_page}
                  per_page={allShelves?.per_page}
                  onPageChange={handlePageChange}
                  onPerPageChange={handlePerPageChange}
                  c
                />
              )}
            </TabPanel>
            <TabPanel className={"flex flex-col flex-1"}>
              <BorderBox className={"my-4 flex-1"}>
                <Table query={queryStandTypes} />
              </BorderBox>
              {allStandTypes?.total > 0 && (
                <Pagination
                  from={allStandTypes?.from}
                  to={allStandTypes?.to}
                  total={allStandTypes?.total}
                  current_page={allStandTypes?.current_page}
                  last_page={allStandTypes?.last_page}
                  per_page={allStandTypes?.per_page}
                  onPageChange={handlePageChange}
                  onPerPageChange={handlePerPageChange}
                />
              )}
            </TabPanel>
            <TabPanel className={"flex flex-col flex-1"}>
              <BorderBox className={"my-4 flex-1"}>
                <Table query={queryPosMaterials} />
              </BorderBox>
              {allPosMaterials?.total > 0 && (
                <Pagination
                  from={allPosMaterials?.from}
                  to={allPosMaterials?.to}
                  total={allPosMaterials?.total}
                  current_page={allPosMaterials?.current_page}
                  last_page={allPosMaterials?.last_page}
                  per_page={allPosMaterials?.per_page}
                  onPageChange={handlePageChange}
                  onPerPageChange={handlePerPageChange}
                  c
                />
              )}
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
      <Dialog
        isOpen={isOpenAddNewStand}
        title="add new stand"
        className="max-w-lg"
      >
        <StandForm onClose={() => setIsOpenAddNewStand(false)} />
      </Dialog>
      <Dialog
        isOpen={isOpenAddNewStandType}
        title="Add New Stand Type"
        className="max-w-[1000px]"
      >
        <StandTypeForm onClose={() => setIsOpenAddNewStandType(false)} />
      </Dialog>
      <Dialog
        isOpen={isOpenAddNewPOSMaterials}
        title="Create POS Materials"
        className="max-w-2xl"
      >
        <POSMaterialsForm onClose={() => setIsOpenAddNewPOSMaterials(false)} />
      </Dialog>
    </div>
  );
}
