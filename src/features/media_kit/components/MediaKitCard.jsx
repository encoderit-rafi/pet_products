import React from "react";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import BorderBox from "@/components/box/BorderBox";
import IconButton from "@/components/buttons/IconButton";
import DownloadIcon from "@/assets/icons/DownloadIcon";
import { LoaderIcon } from "react-hot-toast";

export default function MediaKitCard({
  data,
  onClickDownload,
  isLoadingDownload,
  isLoadingDelete,
  onClickDelete,
}) {
  const isImage = (ext) => ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);

  return (
    <BorderBox className="p-2 lg:p-2 !border-custom_line_eight">
      <div className="flex items-center gap-2">
        <div className="p-1 size-14 bg-custom_bg_two rounded-2xl shrink-0">
          {/* {data?.url} */}
          {isImage(data.extension) ? (
            // <img
            //   src={data?.url || "/placeholder-image.webp"}
            //   // src={data?.url}
            //   onError={(e) => (e.target.src = "/placeholder-image.webp")}
            //   alt=""
            //   className="object-cover rounded-lg size-full"
            // />
            <div className="flex items-center relative overflow-hidden bg-[url('/placeholder-image.webp')] bg-black/90 bg-center bg-cover justify-center rounded-lg size-full">
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative z-10">{data.extension}</div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-lg size-full bg-custom_bg_eight">
              {data.extension}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center flex-1 capitalize ">
          <p className="w-40 text-sm font-normal text-custom_text_four">
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
