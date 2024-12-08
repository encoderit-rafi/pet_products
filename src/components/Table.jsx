import React from "react";

export default function Table({ query, className = "" }) {
  return (
    <div
      className={twMerge(
        "relative h-full max-h-[600px] overflow-y-auto",
        className
      )}
    >
      {query.isLoading && (
        <div className="w-full h-1 overflow-hidden bg-gray-200 rounded-full">
          <div className="h-4 rounded-lg bg-custom_primary animate-loading"></div>
        </div>
      )}
      <table className="min-w-full table-fixed">
        <thead className="sticky top-0 z-10 bg-custom_bg_three">
          <tr>
            {query.headers.map((header) => (
              <th
                key={`header-${header.value}-${Math.random()}`}
                className={`text-responsive-base ${twMerge(
                  "whitespace-nowrap px-4 py-2 text-left  font-medium capitalize tracking-wider text-gray-400 hover:cursor-default",
                  header.className?.th
                )}`}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700">
          {query?.data?.map((row) => (
            <tr
              key={`${row.id}-${Math.random()}`}
              className="text-custom_text_two hover:text-custom_primary"
            >
              {query?.headers.map((header) => (
                <td
                  key={`${header.value}-${Math.random()}`}
                  className={`text-responsive-sm ${twMerge(
                    "whitespace-nowrap px-4 py-3  font-normal capitalize hover:cursor-default",
                    header.className?.td
                  )}`}
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
