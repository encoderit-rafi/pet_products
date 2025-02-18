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
import { useGetAllMediaKits } from "./api/queries/useGetAllMediaKits";
import MediaKitCardSkeleton from "./components/MediaKitCardSkeleton";
import MediaKitCard from "./components/MediaKitCard";
import { useMediaKitDownload } from "./api/queries/useMediaKitDownload";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
import { useDeleteMediaKit } from "./api/mutations/useDeleteMediaKit";
// import { useGetAllStandTypes } from "./api/queries/useGetAllStandTypes";
// import { useGetAllPosMaterials } from "./api/queries/useGetAllPosMaterials";

export default function MediaKit() {
  const { data } = useGetAllBrands();

  const tabs = [
    {
      id: 0,
      name: "Brand Guidelines",
      value: "brand_guidelines",
      icon: <BrandGuidelinesIcon className="w-3" />,
    },
    {
      id: 1,
      name: "Brand Logo",
      value: "brand_logo",
      icon: <BrandLogoIcon className="w-4" />,
    },
    {
      id: 2,
      name: "Product Images",
      value: "product_images",
      icon: <ProductImagesIcon className="w-4" />,
    },
    {
      id: 3,
      name: "Product Description",
      value: "product_description",
      icon: <ProductDescriptionIcon className="w-4" />,
    },
    {
      id: 4,
      name: "Marketing Materials",
      value: "marketing_materials",
      icon: <MarketingMaterialsIcon className="w-4" />,
    },
    {
      id: 5,
      name: "Media Commercials",
      value: "media_commercials",
      icon: <MediaCommercialsIcon className="w-4" />,
    },
  ];

  const { width } = useWindowSize();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpenDeleteFile, setIsOpenDeleteFile] = useState(false);
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );
  const [selectedBrand, setSelectedBrand] = useState([]);
  useEffect(() => {
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
      setSearchParams({ type: "brand_guidelines" });
  }, [searchParams.get("type")]);

  const {
    data: allMediaKits,
    refetch: fetchAllMediaKits,
    isFetching,
    isLoading,
  } = useGetAllMediaKits({
    brandId: selectedBrand[0]?.id,
    category: activeTab?.value,
  });
  const { refetch: downloadMediaKit, isLoading: isLoadingDownloadMediaKit } =
    useMediaKitDownload({
      brandId: selectedBrand[0]?.id,
      category: activeTab?.value,
      fileName: selectedFile,
    });
  const { mutate: deleteMediaKit, isLoading: isLoadingDeleteMediaKit } =
    useDeleteMediaKit();
  function confirmDeleteMediaKit() {
    deleteMediaKit(
      {
        brandId: selectedBrand[0]?.id,
        category: activeTab?.value,
        fileName: selectedFile,
      },
      {
        onSuccess() {
          fetchAllMediaKits();
          setSelectedFile("");
          setIsOpenDeleteFile(false);
        },
      }
    );
  }
  useEffect(() => {
    selectedFile && downloadMediaKit();
    // fetchAllMediaKits();
  }, [selectedFile]);
  useEffect(() => {
    fetchAllMediaKits();
    console.log(selectedBrand[0]?.id);
  }, [selectedBrand, activeTab]);
  useEffect(() => {
    console.log("✅ ~ MediaKit ~ allMediaKits:", allMediaKits);
  }, [allMediaKits]);
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
        <div className="flex flex-col flex-1">
          <div className="grid grid-cols-1 gap-6 mt-2 md:grid-cols-2 xl:grid-cols-3">
            {!isFetching && !isLoading && !Array.isArray(allMediaKits) ? (
              <span className="text-red-500"> No Data Found</span>
            ) : isFetching || isLoading ? (
              Array.from({ length: 12 }, (_, i) => <MediaKitCardSkeleton />)
            ) : (
              allMediaKits?.map((data, i) => (
                <MediaKitCard
                  key={i}
                  data={data}
                  isLoadingDownload={
                    isLoadingDownloadMediaKit && data.name == selectedFile
                  }
                  onClickDownload={() => {
                    setSelectedFile(data.name);
                  }}
                  onClickDelete={() => {
                    setSelectedFile(data.name);
                    setIsOpenDeleteFile(true);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </TabGroup>
      <DialogConfirmDelete
        text={selectedFile || ""}
        isOpen={isOpenDeleteFile}
        onClickClose={() => {
          // setTempData(null)
          setSelectedFile("");
          setIsOpenDeleteFile(false);
        }}
        onClickDelete={confirmDeleteMediaKit}
        isLoading={isLoadingDeleteMediaKit}
      />
    </div>
  );
}
