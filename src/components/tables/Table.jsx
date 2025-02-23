// import cn from "@/lib/utils/cn";
// import React from "react";

// export default function Table({ query }) {
//   return (
//     <div className="relative h-full max-h-[530px] text-xs pr-2">
//       <table className="min-w-full table-fixed">
//         <thead className="sticky top-0 bg-custom_bg_three z-10">
//           <tr>
//             {query.headers.map((header) => (
//               <th
//                 key={`header-${header.value}`}
//                 className={cn(
//                   `bg-custom_bg_two whitespace-nowrap first:px-0 text-left last:text-right last:pr-[14px] px-4 py-2  text-xs capitalize tracking-wider text-custom_text_nine font-light hover:cursor-default w-32`,
//                   header?.className?.th
//                 )}
//               >
//                 {header.name}
//               </th>
//             ))}
//           </tr>
//         </thead>
//       </table>
//       <div
//         className={cn(
//           "max-h-[450px] overflow-y-auto pr-2",
//           query?.className?.table?.tbody?.tbody
//         )}
//       >
//         <table className="min-w-full table-fixed">
//           <tbody>
//             {query.isLoading
//               ? Array.from({ length: 5 }).map((_, i) => (
//                   <tr
//                     key={`skeleton-${i}`}
//                     className="border-b text-custom_text_two border-custom_line_two"
//                   >
//                     {query.headers.map((header) => (
//                       <td
//                         key={`skeleton-${header.value}-${i}`}
//                         className="whitespace-nowrap first:px-0  last:px-0 px-4 py-3 text-xs text-custom_text_two font-light capitalize hover:cursor-default"
//                       >
//                         <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               : query.data.map((row) => (
//                   <tr
//                     key={`row-${row.id}`}
//                     className="border-b text-custom_text_two border-custom_line_two last:border-b-0"
//                   >
//                     {query.headers.map((header) => (
//                       <td
//                         key={`row-${row.id}-${header.value}`}
//                         className="whitespace-nowrap text-left first:px-0 last:text-right last:px-0  px-4 py-3 text-xs text-custom_text_two font-light capitalize hover:cursor-default  truncate"
//                       >
//                         {header.cellValue(row)}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import cn from "@/lib/utils/cn";
import React from "react";

export default function Table({ query }) {
  return (
    <div className="relative h-full max-h-[530px] pr-2">
      <table className="w-full table-fixed border-collapse">
        <thead className="sticky top-0 bg-custom_bg_three z-10">
          <tr>
            {query.headers.map((header) => (
              <th
                key={`header-${header.value}`}
                className={cn(
                  `bg-custom_bg_two   whitespace-nowrap overflow-hidden truncate 
                  first:text-left last:text-right text-center  text-xs capitalize tracking-wider
                  text-custom_text_nine font-light hover:cursor-default py-2 px-4`,
                  header?.className?.th
                )}
              >
                {/* px-4 py-2 */}
                <span className="w-full truncate">{header.name}</span>
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div
        className={cn(
          "max-h-[450px] overflow-y-auto pr-2",
          query?.className?.table?.tbody?.tbody
        )}
      >
        <table className="w-full table-fixed border-collapse">
          <tbody>
            {query.isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr
                    key={`skeleton-${i}`}
                    className="border-b text-custom_text_two border-custom_line_two"
                  >
                    {query.headers.map((header) => (
                      <td
                        key={`skeleton-${header.value}-${i}`}
                        className="w-20 max-w-20 whitespace-nowrap overflow-hidden text-ellipsis truncate
                          py-2 px-4 text-xs text-custom_text_two font-light capitalize hover:cursor-default border-b border-custom_line_two group first:mx-auto"
                      >
                        <div className="group-first:mx-0 mx-auto group-last:ml-auto w-20 h-3 rounded-full bg-custom_bg_one animate-pulse" />
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
                        className="whitespace-nowrap overflow-hidden truncate 
                           text-xs text-custom_text_two font-light capitalize py-2 px-4 
                           last:pr-0 first:text-left last:text-right text-center hover:cursor-default border-b border-custom_line_two "
                      >
                        {/* px-4 py-3 */}
                        <span className="inline-block w-full truncate">
                          {header.cellValue(row)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
