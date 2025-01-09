import React, { useEffect, useState } from "react";
import BaseInput from "../inputs/BaseInput";
import Label from "../texts/Label";
import IconButton from "../buttons/IconButton";
import DownIcon from "@/assets/icons/DownIcon";
import { useDebounce } from "@/hooks/useDebounce";

export default function Pagination({
  to,
  total,
  last_page,
  current_page,
  per_page,
  onPageChange,
  onPerPageChange,
}) {

  const [page, setPage] = useState(current_page);
  const [perPage, setPerPage] = useState(per_page);
  const debouncedPerPage = useDebounce(perPage);
  useEffect(() => {
    onPerPageChange(debouncedPerPage);
  }, [debouncedPerPage]);
  useEffect(() => {
    onPageChange(page);
  }, [page]);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BaseInput
          hideLabel
          type="number"
          id="per_page"
          min={1}
          className="w-16 h-10 text-center"
          value={perPage}
          onChange={(e) => setPerPage(+e.target.value)}
        />
        <Label id="per_page" label="per page" className="text-md" />
      </div>
      <Label label={`${to}/${total}`} />
      <div className="flex items-center justify-center gap-2 text-custom_yellow">
        {page > 1 && (
          <IconButton onClick={() => setPage((val) => val - 1)}>
            <DownIcon className="rotate-90 size-4" />
          </IconButton>
        )}
        {page < last_page && (
          <IconButton onClick={() => setPage((val) => val + 1)}>
            <DownIcon className="-rotate-90 size-4" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
