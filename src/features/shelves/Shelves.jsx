import Title from "@/components/texts/Title";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import demoData from "@/lib/data/demo";
import BorderBox from "@/components/box/BorderBox";
import Table from "@/components/tables/Table";
import BaseButton from "@/components/buttons/BaseButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import Dialog from "@/components/dialogs/Dialog";
import BaseMenu from "@/components/menus/BaseMenu";
import BaseSelectDropdown from "@/components/dropdowns/BaseSelectDropdown";
import Label from "@/components/texts/Label";
import InputText from "@/components/inputs/InputText";
import MultiSelectListbox from "@/components/dropdowns/MultiSelectListbox";
import CustomPhoneInput from "@/components/inputs/InputPhoneNumber";
import BaseInput from "@/components/inputs/BaseInput";
import BaseTabList from "@/components/tabs/BaseTabList";
import { useWindowSize } from "react-use";
import { useSearchParams } from "react-router-dom";
import { useGetAllShelves } from "./api/queries/useGetAllShelves";
import Pagination from "@/components/pagination";
import { useGetAllStandTypes } from "./api/queries/useGetAllStandTypes";
import { useGetAllPosMaterials } from "./api/queries/useGetAllPosMaterials";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useGetAllProducts } from "../products/api/queries/useGetAllProducts";
import ImagePicker from "@/components/file_pickers/ImagePicker";
import { validationRules } from "@/consts";
import { useForm } from "react-hook-form";
import StandTypeForm from "./components/StandTypeForm";
// const query = {
//   headers: [
//     {
//       name: "brand",
//       value: "name",
//       cellValue: (row) => row.name,
//     },
//     {
//       name: "stand type",
//       value: "stand_type",
//       cellValue: (row) => {
//         return row?.stand_type.name;
//       },
//     },
//     {
//       name: "store",
//       value: "store",
//       cellValue: (row) => {
//         return "API KEY MISSING";
//       },
//     },
//     {
//       name: "location",
//       value: "location",
//       cellValue: (row) => {
//         return "API KEY MISSING";
//       },
//     },
//     {
//       name: "images",
//       value: "images",
//       cellValue: (row) => {
//         return "API KEY MISSING";
//       },
//     },
//     {
//       name: "cost",
//       value: "cost",
//       cellValue: (row) => {
//         return row?.stand_type.cost;
//       },
//     },
//   ],
//   isLoading: false,
//   data: demoData,
// };
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
  } = useGetAllShelves({ isEnabled: true });
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
          cellValue: (row) => row.name,
        },
        {
          name: "stand type",
          value: "stand_type",
          cellValue: (row) => {
            return row?.stand_type.name;
          },
        },
        {
          name: "store",
          value: "store",
          cellValue: (row) => {
            return "API KEY MISSING";
          },
        },
        {
          name: "location",
          value: "location",
          cellValue: (row) => {
            return "API KEY MISSING";
          },
        },
        {
          name: "images",
          value: "images",
          cellValue: (row) => {
            return "API KEY MISSING";
          },
        },
        {
          name: "cost",
          value: "cost",
          cellValue: (row) => {
            return row?.stand_type.cost;
          },
        },
      ],
      isLoading: false,
      data: allShelves?.data || [],
    }),
    [allShelves]
  );
  const queryShelvesLoading = {
    headers: [
      {
        name: "brand",
        value: "name",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
              <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
            </div>
          );
        },
      },
      {
        name: "stand type",
        value: "stand_type",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "store",
        value: "store",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "location",
        value: "location",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "cost",
        value: "cost",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
    ],
    isLoading: false,
    data: Array.from({ length: 5 }, (_, i) => i),
  };
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
        // {
        //   name: "store",
        //   value: "store",
        //   cellValue: (row) => {
        //     return "API KEY MISSING";
        //   },
        // },
        // {
        //   name: "location",
        //   value: "location",
        //   cellValue: (row) => {
        //     return "API KEY MISSING";
        //   },
        // },
        // {
        //   name: "images",
        //   value: "images",
        //   cellValue: (row) => {
        //     return "API KEY MISSING";
        //   },
        // },
        {
          name: "cost",
          value: "cost",
          cellValue: (row) => {
            return row?.cost ? `SR ${row?.cost}` : "-";
          },
        },
      ],
      isLoading: false,
      data: allStandTypes?.data || [],
    }),
    [allStandTypes]
  );
  const queryStandTypesLoading = {
    headers: [
      {
        name: "brand",
        value: "name",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
              <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
            </div>
          );
        },
      },
      {
        name: "stand type",
        value: "stand_type",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "POS materials",
        value: "pos_materials",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "FS units",
        value: "fs_units",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
      {
        name: "shelves",
        value: "shelves",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },

      {
        name: "cost",
        value: "cost",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
    ],
    isLoading: false,
    data: Array.from({ length: 5 }, (_, i) => i),
  };
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
      isLoading: false,
      data: allStandTypes?.data || [],
    }),
    [allStandTypes]
  );
  const queryPosMaterialsLoading = {
    headers: [
      {
        name: "brand",
        value: "name",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
              <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
            </div>
          );
        },
      },

      {
        name: "POS materials",
        value: "pos_materials",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },

      {
        name: "cost",
        value: "cost",
        cellValue: () => (
          <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
        ),
      },
    ],
    isLoading: false,
    data: Array.from({ length: 5 }, (_, i) => i),
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isOpenAddNewStand, setIsOpenAddNewStand] = useState(false);
  const [isOpenAddNewStandType, setIsOpenAddNewStandType] = useState(false);
  const [isOpenAddNewPOSMaterials, setIsOpenAddNewPOSMaterials] =
    useState(false);
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );

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
                {isLoadingAllShelves || isFetchingAllShelves ? (
                  <Table query={queryShelvesLoading} />
                ) : allShelves?.total > 0 ? (
                  <Table
                    query={{ ...queryShelves, data: allShelves?.data || [] }}
                  />
                ) : (
                  <h5 className="text-xl text-center text-red-500">
                    No data found
                  </h5>
                )}
              </BorderBox>
              {allShelves?.total > 0 && (
                <Pagination
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
                {isLoadingAllStandTypes || isFetchingAllStandTypes ? (
                  <Table query={queryStandTypesLoading} />
                ) : allStandTypes?.total > 0 ? (
                  <Table
                    query={{
                      ...queryStandTypes,
                      data: allStandTypes?.data || [],
                    }}
                  />
                ) : (
                  <h5 className="text-xl text-center text-red-500">
                    No data found
                  </h5>
                )}
              </BorderBox>
              {allStandTypes?.total > 0 && (
                <Pagination
                  to={allStandTypes?.to}
                  total={allStandTypes?.total}
                  current_page={allStandTypes?.current_page}
                  last_page={allStandTypes?.last_page}
                  per_page={allStandTypes?.per_page}
                  onPageChange={handlePageChange}
                  onPerPageChange={handlePerPageChange}
                  c
                />
              )}
            </TabPanel>
            <TabPanel className={"flex flex-col flex-1"}>
              <BorderBox className={"my-4 flex-1"}>
                {isLoadingAllPosMaterials || isFetchingAllPosMaterials ? (
                  <Table query={queryPosMaterialsLoading} />
                ) : allPosMaterials?.total > 0 ? (
                  <Table
                    query={{
                      ...queryPosMaterials,
                      data: allPosMaterials?.data || [],
                    }}
                  />
                ) : (
                  <h5 className="text-xl text-center text-red-500">
                    No data found
                  </h5>
                )}
              </BorderBox>
              {allPosMaterials?.total > 0 && (
                <Pagination
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
        <form className="flex flex-col space-y-4">
          <ImagePicker isError={false} />
          <div className="space-y-4 overflow-auto max-h-32 lg:max-h-72">
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
            <div className="space-y-2 ">
              <Label id="Location" label="Location" palceholder="Location" />
              <BaseSelectDropdown />
            </div>
            <BaseInput
              id="Cost"
              label="Cost"
              palceholder="Cost"
              // className="py-3 rounded-lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <BaseButton onClick={() => setIsOpenAddNewStand(false)}>
              cancel
            </BaseButton>
            <BaseButton variant="gradient">confirm</BaseButton>
          </div>
        </form>
      </Dialog>
      <Dialog
        isOpen={isOpenAddNewStandType}
        title="Add New Stand Type"
        className="max-w-3xl"
      >
        <StandTypeForm />
      </Dialog>
      <Dialog
        isOpen={isOpenAddNewPOSMaterials}
        title="Create POS Materials"
        className="max-w-2xl"
      >
        <div className="flex flex-col mt-4 space-y-4">
          <ImagePicker />
          <div className="space-y-2 overflow-auto max-h-72">
            <BaseInput id="Name" label="Name" palceholder="Name" />

            <div className="space-y-2">
              <Label id="brand" label="brand" palceholder="brand" />
              <BaseSelectDropdown />
            </div>
            <BaseInput id="Cost" label="Cost" palceholder="Cost" />
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
