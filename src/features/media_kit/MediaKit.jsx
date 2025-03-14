import Title from "@/components/texts/Title";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import BaseTabList from "@/components/tabs/BaseTabList";
import BrandGuidelinesIcon from "@/assets/icons/BrandGuidelinesIcon";
import BrandLogoIcon from "@/assets/icons/BrandLogoIcon";
import ProductImagesIcon from "@/assets/icons/ProductImagesIcon";
import ProductDescriptionIcon from "@/assets/icons/ProductDescriptionIcon";
import MarketingMaterialsIcon from "@/assets/icons/MarketingMaterialsIcon";
import MediaCommercialsIcon from "@/assets/icons/MediaCommercialsIcon";
import BrandsDropdown from "@/components/dropdowns/BrandsDropdown";
import MediaKitCardSkeleton from "./components/MediaKitCardSkeleton";
import MediaKitCard from "./components/MediaKitCard";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
import FileUploadForm from "./components/FileUploadForm";
import { useWindowSize } from "react-use";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TabGroup } from "@headlessui/react";
import { useGetAllBrands } from "@/api/brands/useGetAllBrands";
import { useGetAllMediaKits } from "./api/queries/useGetAllMediaKits";
import { useMediaKitDownload } from "./api/queries/useMediaKitDownload";
import { useDeleteMediaKit } from "./api/mutations/useDeleteMediaKit";
import Page from "@/components/ui/Page";

export default function MediaKit() {
  const { data } = useGetAllBrands();
  const [isOpenFileUpload, setIsOpenFileUpload] = useState(false);
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
  // const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState({ type: "", name: "" });
  // const [selectedShowFile, setSelectedShowFile] = useState("");
  const [isOpenDeleteFile, setIsOpenDeleteFile] = useState(false);
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );
  const [selectedBrand, setSelectedBrand] = useState([]);
  useEffect(() => {
    if (data?.length > 0) {
      if (!!data?.pivot) {
        setSelectedBrand([data.find((data) => data?.pivot?.active == 1)]);
      } else {
        setSelectedBrand([data[0]]);
      }
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
      fileName: selectedFile.name,
    });
  // const { refetch: showMediaKit, isLoading: isLoadingShowMediaKit } =
  // useShowMediaKitFile({
  //     brandId: selectedBrand[0]?.id,
  //     category: activeTab?.value,
  //     fileName: selectedShowFile,
  //   });
  const { mutate: deleteMediaKit, isLoading: isLoadingDeleteMediaKit } =
    useDeleteMediaKit();
  function confirmDeleteMediaKit() {
    deleteMediaKit(
      {
        brandId: selectedBrand[0]?.id,
        category: activeTab?.value,
        // fileName: selectedFile,
        fileName: selectedFile.name,
      },
      {
        onSuccess() {
          fetchAllMediaKits();
          // setSelectedFile("");
          setSelectedFile({
            type: "",
            name: "",
          });

          setIsOpenDeleteFile(false);
        },
      }
    );
  }
  useEffect(() => {
    selectedFile?.type == "download" && downloadMediaKit();
    // fetchAllMediaKits();
  }, [selectedFile]);
  // useEffect(() => {
  //   selectedShowFile != "" && showMediaKit();
  // }, [selectedShowFile]);
  useEffect(() => {
    fetchAllMediaKits();
    selectedBrand[0]?.id;
  }, [selectedBrand, activeTab]);

  return (
    <div className="flex flex-col h-full gap-4 text-custom_bg_three">
      <Page
        title="Media kit"
        actions={
          <div className="flex flex-row items-center gap-4">
            <BrandsDropdown
              hideLabel
              className="lg:rounded-xl w-36"
              selected={selectedBrand}
              setSelected={(data) => {
                data?.id != selectedBrand?.[0]?.id && setSelectedBrand([data]);
              }}
            />
            <BaseButton
              variant="orange"
              icon="plus"
              className="px-3 ml-auto text-xs max-w-fit lg:px-5 lg:ml-0"
              onClick={() => setIsOpenFileUpload(true)}
            >
              <span className="hidden lg:block">Upload FIle</span>
            </BaseButton>
          </div>
        }
        header={
          <TabGroup
            selectedIndex={activeTabIndex}
            onChange={setActiveTabIndex}
            className={"flex justify-center flex-nowrap overscroll-x-auto"}
          >
            <BaseTabList
              list={tabs}
              activeTab={activeTab}
              className={{ tabList: "flex flex-nowrap overflow-auto" }}
              handelOnChangeTab={(item) => {
                setSearchParams({ type: item.value });
              }}
            />
          </TabGroup>
        }
      >
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
                  data={{
                    ...data,
                    brandId: selectedBrand[0]?.id,
                    category: activeTab?.value,
                  }}
                  isLoadingDownload={
                    // isLoadingDownloadMediaKit && data.name == selectedFile
                    isLoadingDownloadMediaKit &&
                    data.original_name == selectedFile.name
                  }
                  onClickDownload={() => {
                    // setSelectedFile(data.name);
                    setSelectedFile({
                      type: "download",
                      name: data.original_name,
                    });
                  }}
                  onClickDelete={() => {
                    // setSelectedFile(data.name);
                    setSelectedFile({
                      type: "delete",
                      name: data.original_name,
                    });

                    setIsOpenDeleteFile(true);
                  }}
                />
              ))
            )}
          </div>
        </div>
        <Dialog
          isOpen={isOpenFileUpload}
          title="Upload your File"
          className="max-w-lg"
        >
          <FileUploadForm
            onClose={() => setIsOpenFileUpload(false)}
            item={{
              brandId: selectedBrand[0]?.id,
              category: searchParams.get("type") || "brand_guidelines",
            }}
          />
        </Dialog>
        <DialogConfirmDelete
          text={selectedFile.name || ""}
          isOpen={isOpenDeleteFile}
          onClickClose={() => {
            // setTempData(null)
            setSelectedFile({ type: "", name: "" });
            setIsOpenDeleteFile(false);
          }}
          onClickDelete={confirmDeleteMediaKit}
          isLoading={isLoadingDeleteMediaKit}
        />
      </Page>
    </div>
  );
}
