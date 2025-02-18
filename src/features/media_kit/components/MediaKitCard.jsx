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
          {isImage(data.extension) ? (
            <img
              src={data.image?.url || "/placeholder-image.webp"}
              alt=""
              className="object-cover rounded-lg size-full"
            />
          ) : (
            <div className="size-full bg-custom_bg_eight flex items-center justify-center rounded-lg">
              {data.extension}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center flex-1 capitalize ">
          <p className="text-sm font-normal text-custom_text_four truncate w-40">
            {data.name}
          </p>

          <p className="px-1 text-xs whitespace-nowrap text-custom_text_five font-extralight">
            {(data.size_in_bytes / 1000000).toFixed(2)}MB
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
