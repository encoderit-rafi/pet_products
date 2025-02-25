// import cn from "@/lib/utils/cn";
// import React from "react";

// export default function Table({ query }) {
//   return (
//     <div className="relative h-full max-h-[530px] pr-2 overflow-x-auto">
//       <table className="w-full border-collapse table-fixed">
//         <thead className="sticky top-0 z-10 bg-custom_bg_three">
//           <tr>
//             {query.headers.map((header) => (
//               <th
//                 key={`header-${header.value}`}
//                 className={cn(
//                   `bg-custom_bg_two   whitespace-nowrap overflow-hidden truncate
//                   first:text-left last:text-right text-center  text-xs capitalize tracking-wider
//                   text-custom_text_nine font-light hover:cursor-default py-2 px-4 last:pr-0`,
//                   header?.className?.th
//                 )}
//               >
//                 <span className="w-full truncate">{header.name}</span>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody
//           className={cn(
//             "max-h-[450px] overflow-y-auto table-fixed pr-2",
//             query?.className?.table?.tbody?.tbody
//           )}
//         >
//           {query.isLoading
//             ? Array.from({ length: 5 }).map((_, i) => (
//                 <tr
//                   key={`skeleton-${i}`}
//                   className="border-b text-custom_text_two border-custom_line_two"
//                 >
//                   {query.headers.map((header) => (
//                     <td
//                       key={`skeleton-${header.value}-${i}`}
//                       className="w-20 px-4 py-2 overflow-hidden text-xs font-light capitalize truncate border-b max-w-20 whitespace-nowrap text-ellipsis text-custom_text_two hover:cursor-default border-custom_line_two group first:mx-auto"
//                     >
//                       <div className="w-20 h-3 mx-auto rounded-full group-first:mx-0 group-last:ml-auto bg-custom_bg_one animate-pulse" />
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             : query.data.map((row) => (
//                 <tr
//                   key={`row-${row.id}`}
//                   className="border-b text-custom_text_two border-custom_line_two last:border-b-0"
//                 >
//                   {query.headers.map((header) => (
//                     <td
//                       key={`row-${row.id}-${header.value}`}
//                       className="px-4 py-2 text-xs font-light text-center capitalize truncate border-b whitespace-nowrap text-custom_text_two last:pr-0 first:text-left last:text-right hover:cursor-default border-custom_line_two "
//                     >
//                       {header.cellValue(row)}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import cn from "@/lib/utils/cn";
import React from "react";
import Tooltip from "../ui/Tooltip";
// import Tooltip from "./Tooltip";

export default function Table({ query }) {
  return (
    <div className="relative h-full max-h-[530px] pr-2 overflow-x-auto">
      <table className="w-full border-collapse table-fixed">
        <thead className="sticky top-0 z-10 bg-custom_bg_three">
          <tr>
            {query.headers.map((header) => (
              <th
                key={`header-${header.value}`}
                className={cn(
                  `bg-custom_bg_two whitespace-nowrap truncate 
                  first:text-left last:text-right text-center text-xs capitalize tracking-wider
                  text-custom_text_nine font-light hover:cursor-default py-2 px-4 last:pr-0`,
                  header?.className?.th
                )}
              >
                <span className="w-full truncate">{header.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={cn(
            "max-h-[450px] overflow-y-auto pr-2",
            query?.className?.table?.tbody?.tbody
          )}
        >
          {query.isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr
                  key={`skeleton-${i}`}
                  className="border-b text-custom_text_two border-custom_line_two"
                >
                  {query.headers.map((header) => (
                    <td
                      key={`skeleton-${header.value}-${i}`}
                      className="w-20 px-4 py-2 text-xs font-light capitalize border-b max-w-20 whitespace-nowrap text-custom_text_two hover:cursor-default border-custom_line_two"
                    >
                      <div className="w-20 h-3 mx-auto rounded-full bg-custom_bg_one animate-pulse" />
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
                      className="px-4 py-2 text-xs font-light text-center capitalize border-b whitespace-nowrap text-custom_text_two last:pr-0 first:text-left last:text-right hover:cursor-default border-custom_line_two"
                    >
                      <div className="relative ">
                        {/* <Tooltip text={header.cellValue(row)}>
                          <span className="truncate">
                          </span>
                        </Tooltip> */}
                        {header.cellValue(row)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
