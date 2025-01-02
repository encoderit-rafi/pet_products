import cn from "@/lib/utils/cn";
import React from "react";

export default function Table({ query }) {
  return (
    <div
      className={"relative h-full max-h-[530px] overflow-y-auto text-xs pr-2"}
    >
      {query.isLoading && (
        <div className="w-full h-1 overflow-hidden bg-gray-200 rounded-full">
          <div className="h-4 rounded-lg bg-custom_primary animate-loading"></div>
        </div>
      )}
      <table className="min-w-full table-fixed">
        <thead className="sticky top-0 bg-custom_bg_three">
          <tr>
            {query.headers.map((header) => (
              <th
                key={`header-${header.value}-${Math.random()}`}
                className={cn(
                  `bg-custom_bg_two whitespace-nowrap first:px-0 last:px-0 px-4 py-2 text-left  text-xs capitalize tracking-wider text-custom_text_nine font-light hover:cursor-default
                `,
                  header?.className?.th
                )}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="">
          {query?.data?.map((row) => (
            <tr
              key={`${row.id}-${Math.random()}`}
              className="border-b text-custom_text_two border-custom_line_two"
            >
              {query?.headers.map((header) => (
                <td
                  key={`${header.value}-${Math.random()}`}
                  className={`whitespace-nowrap first:px-0 last:px-0 px-4 py-3  text-xs text-custom_text_two font-light capitalize hover:cursor-default`}
                >
                  {header.cellValue(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
