import cn from "@/lib/utils/cn";
import React from "react";

export default function Table({ query }) {
  return (
    <div className="relative h-full max-h-[800px] pr-2 overflow-auto">
      <table className="w-full border-collapse table-auto">
        <thead className="sticky top-0 z-10 bg-custom_bg_three">
          <tr>
            {query.headers.map((header) => (
              <th
                key={`header-${header.value}`}
                className={cn(
                  `bg-custom_bg_two whitespace-nowrap truncate 
                  first:text-left last:text-right text-center text-xs capitalize tracking-wider
                  text-custom_text_nine font-light hover:cursor-default py-2 px-4 first:pl-0 last:pr-0 min-w-[100px]`,
                  header?.className?.th
                )}
              >
                <span className="w-full truncate">{header.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-custom_line_two">
          {query.isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr
                  key={`skeleton-${i}`}
                  className="border-b text-custom_text_two border-custom_line_two"
                >
                  {query.headers.map((header) => (
                    <td
                      key={`skeleton-${header.value}-${i}`}
                      className="px-4 py-2  text-xs font-light capitalize border-b whitespace-nowrap text-custom_text_two hover:cursor-default border-custom_line_two"
                    >
                      <div className="w-full h-3  mx-auto rounded-full bg-custom_bg_one animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            : query.data.map((row) => (
                <tr
                  key={`row-${row.id}`}
                  className="border-b text-custom_text_two border-custom_line_two last:border-b-0"
                >
                  {query.headers.map((header) => (
                    <td
                      key={`row-${row.id}-${header.value}`}
                      className="px-4 py-2 first:pl-0  text-xs font-light text-center capitalize border-b whitespace-nowrap text-custom_text_two last:pr-0 first:text-left last:text-right hover:cursor-default border-custom_line_two min-w-[100px]"
                    >
                      <div className="relative">{header.cellValue(row)}</div>
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
