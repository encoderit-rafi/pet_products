import Title from "@/components/texts/Title";
import BorderBox from "@/components/box/BorderBox";
import Table from "@/components/tables/Table";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import BaseTabList from "@/components/tabs/BaseTabList";
import Pagination from "@/components/pagination";
import { useWindowSize } from "react-use";
import { useSearchParams } from "react-router-dom";
// import { useGetAllStands } from "./api/queries/useGetAllStands";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import BrandGuidelinesIcon from "@/assets/icons/BrandGuidelinesIcon";
import BrandLogoIcon from "@/assets/icons/BrandLogoIcon";
import ProductImagesIcon from "@/assets/icons/ProductImagesIcon";
import ProductDescriptionIcon from "@/assets/icons/ProductDescriptionIcon";
import MarketingMaterialsIcon from "@/assets/icons/MarketingMaterialsIcon";
import MediaCommercialsIcon from "@/assets/icons/MediaCommercialsIcon";
import BrandsDropdown from "@/components/dropdowns/BrandsDropdown";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
// import { useGetAllStandTypes } from "./api/queries/useGetAllStandTypes";
// import { useGetAllPosMaterials } from "./api/queries/useGetAllPosMaterials";

const tabs = [
  {
    id: 0,
    name: "Brand Guidelines",
    value: "brand-guidelines",
    icon: "icon",
  },
  {
    id: 1,
    name: "Brand Logo",
    value: "brand-logo",
  },
  {
    id: 2,
    name: "Product Images",
    value: "product-images",
  },
  {
    id: 3,
    name: "Product Description",
    value: "product-description",
  },
  {
    id: 4,
    name: "Marketing Materials",
    value: "marketing-materials",
  },
  {
    id: 5,
    name: "Media Commercials",
    value: "media-commercials",
  },
];

export default function MediaKit() {
  const { data } = useGetAllBrands();

  const tabs = [
    {
      id: 0,
      name: "Brand Guidelines",
      value: "brand-guidelines",
      icon: <BrandGuidelinesIcon className="w-3" />,
    },
    {
      id: 1,
      name: "Brand Logo",
      value: "brand-logo",
      icon: <BrandLogoIcon className="w-4" />,
    },
    {
      id: 2,
      name: "Product Images",
      value: "product-images",
      icon: <ProductImagesIcon className="w-4" />,
    },
    {
      id: 3,
      name: "Product Description",
      value: "product-description",
      icon: <ProductDescriptionIcon className="w-4" />,
    },
    {
      id: 4,
      name: "Marketing Materials",
      value: "marketing-materials",
      icon: <MarketingMaterialsIcon className="w-4" />,
    },
    {
      id: 5,
      name: "Media Commercials",
      value: "media-commercials",
      icon: <MediaCommercialsIcon className="w-4" />,
    },
  ];

  const { width } = useWindowSize();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );
  const [selectedBrand, setSelectedBrand] = useState([]);
  useEffect(() => {
    // console.log("✅ ~ MediaKit ~ data:", data);
    if (data?.length > 0) {
      setSelectedBrand([
        data.find((data) => data.pivot.active == 1) || data[0],
      ]);
    }
  }, [data]);
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
  useEffect(() => {
    searchParams.get("type") == null &&
      setSearchParams({ type: "brand-guidelines" });
  }, [searchParams.get("type")]);
  return (
    <div className="flex flex-col h-full gap-4 text-custom_bg_three">
      <TabGroup
        selectedIndex={activeTabIndex}
        onChange={setActiveTabIndex}
        className={"flex-1 flex flex-col "}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between flex-1">
            <Title>Media kit</Title>
            <div className="flex flex-row items-center gap-4">
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
              <div className="flex flex-row items-center flex-1 gap-4">
                <BrandsDropdown
                  hideLabel
                  className="w-36"
                  selected={selectedBrand}
                  setSelected={(data) => {
                    data?.id != selectedBrand?.[0]?.id &&
                      setSelectedBrand([data]);
                  }}
                />
                <BaseButton
                  variant="orange"
                  icon="plus"
                  className="px-3 ml-auto text-xs max-w-fit lg:px-5 lg:ml-0"
                  // onClick={handelOpenModal}
                >
                  <span className="hidden lg:block">add new</span>
                </BaseButton>
              </div>
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
        {/* <div className="flex flex-col flex-1">
          <TabPanels className="flex flex-col flex-1">
            <TabPanel className={"flex flex-col flex-1"}>
              <BorderBox className={"my-4 flex-1"}>
                <Table query={queryShelves} />
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
                <Table query={queryStandTypes} />
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
                />
              )}
            </TabPanel>
            <TabPanel className={"flex flex-col flex-1"}>
              <BorderBox className={"my-4 flex-1"}>
                <Table query={queryPosMaterials} />
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
        </div> */}
      </TabGroup>
      {/* <Dialog
        isOpen={isOpenAddNewStand}
        title="add new stand"
        className="max-w-lg"
      >
        <StandForm onClose={() => setIsOpenAddNewStand(false)} />
      </Dialog> */}
      {/* <Dialog
        isOpen={isOpenAddNewStandType}
        title="Add New Stand Type"
        className="max-w-[1000px]"
      >
        <StandTypeForm onClose={() => setIsOpenAddNewStandType(false)} />
      </Dialog> */}
      {/* <Dialog
        isOpen={isOpenAddNewPOSMaterials}
        title="Create POS Materials"
        className="max-w-2xl"
      >
        <POSMaterialsForm onClose={() => setIsOpenAddNewPOSMaterials(false)} />
      </Dialog> */}
    </div>
  );
}
