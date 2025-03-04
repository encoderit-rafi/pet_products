import React, { useEffect, useState } from "react";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BorderBox from "@/components/box/BorderBox";
import IconButton from "@/components/buttons/IconButton";
import DownloadIcon from "@/assets/icons/DownloadIcon";
import { LoaderIcon } from "react-hot-toast";
import ImageDialog from "@/components/dialogs/ImageDialog";
import { useShowMediaKitFile } from "../api/queries/useShowMediaKitFile";
import PdfIcon from "@/assets/icons/PdfIcon";
import FileIcon from "@/assets/icons/FileIcon";

export default function MediaKitCard({
  data,
  onClickDownload,
  isLoadingDownload,
  isLoadingDelete,
  onClickDelete,
}) {
  const {
    data: url,
    refetch: showMediaKit,
    isLoading,
    isFetching,
  } = useShowMediaKitFile({
    brandId: data.brandId,
    category: data.category,
    fileName: data.original_name,
  });
  const [createObj, setCreateObj] = useState(null);
  useEffect(() => {
    showMediaKit();
  }, []);
  useEffect(() => {
    // showMediaKit();
    url?.data && setCreateObj(window.URL.createObjectURL(url.data));
  }, [url]);
  const isImage = (ext) => ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
  const handelIcon = (ext) => {
    switch (ext) {
      case "pdf":
        return <PdfIcon className={"size-4"} />;

      case "doc":
        return <DocIcon className={"size-4"} />;

      default:
        return <FileIcon className={"size-4"} />;
    }
  };

  return (
    <BorderBox className="p-2 lg:p-2 !border-custom_line_eight">
      <div className="flex items-center gap-2">
        <div className="p-1 size-14 bg-custom_bg_two rounded-2xl shrink-0">
          {/* {data?.url} */}
          {isImage(data.extension) && !isLoading && !isFetching ? (
            <ImageDialog src={createObj} className={"size-full rounded-xl"} />
          ) : (
            <div className="flex items-center justify-center rounded-lg size-full bg-custom_bg_eight">
              {data.extension == "pdf" ? (
                <PdfIcon className={"size-4"} />
              ) : (
                handelIcon(data.extension)
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center flex-1 capitalize ">
          <p className="w-40 text-sm font-normal text-custom_text_four truncate">
            {data.original_name}
          </p>

          <p className="px-1 text-xs whitespace-nowrap text-custom_text_five font-extralight">
            {(data.size_in_bytes / 1024).toFixed(2)} KB
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-custom_yellow">
          <IconButton
            onClick={onClickDownload}
            disabled={isLoadingDownload || isLoadingDelete}
          >
            {isLoadingDownload ? (
              <LoaderIcon className="size-4" />
            ) : (
              <DownloadIcon className="size-5" />
            )}
          </IconButton>
          <IconButton
            onClick={onClickDelete}
            disabled={isLoadingDownload || isLoadingDelete}
          >
            {isLoadingDelete ? (
              <LoaderIcon className="size-4" />
            ) : (
              <DeleteIcon className="size-4" />
            )}
          </IconButton>
        </div>
      </div>
    </BorderBox>
  );
}
