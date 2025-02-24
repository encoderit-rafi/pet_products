import React, { useEffect, useState } from "react";
import BaseInput from "../inputs/BaseInput";
import Label from "../texts/Label";
import IconButton from "../buttons/IconButton";
import DownIcon from "@/assets/icons/DownIcon";

export default function Pagination({
  to,
  from,
  total,
  last_page,
  current_page,
  per_page,
  onPageChange,
  onPerPageChange,
}) {
  const [page, setPage] = useState(current_page);
  const [perPage, setPerPage] = useState(per_page);
  // const debouncedPerPage = useDebounce(perPage);

  // // Synchronize internal state with props
  useEffect(() => {
    setPage(current_page);
  }, [current_page]);

  useEffect(() => {
    setPerPage(per_page);
  }, [per_page]);

  // Trigger `onPageChange` only when user changes the page
  useEffect(() => {
    onPageChange(page);
  }, [page]);

  function handleOnChangePerPage() {
    onPerPageChange(perPage);
  }

  return (
    <div className="flex items-center justify-end gap-3 relative">
      <div className="flex items-center gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnChangePerPage();
          }}
        >
          <BaseInput
            hideLabel
            type="number"
            id="per_page"
            min={1}
            className="w-16 h-10 text-center"
            value={perPage}
            onChange={(e) => setPerPage(+e.target.value)}
          />
        </form>
        {/* <Label id="per_page" label="per page" className="text-md" /> */}
      </div>
      <Label
        label={`${from}-${to}/${total}`}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="flex items-center justify-center gap-2 text-custom_yellow">
        {+page > 1 && (
          <IconButton onClick={() => setPage(page - 1)}>
            <DownIcon className="rotate-90 size-4" />
          </IconButton>
        )}
        {+page < last_page && (
          <IconButton onClick={() => setPage(page + 1)}>
            <DownIcon className="-rotate-90 size-4" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
