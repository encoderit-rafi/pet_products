import DownIcon from "@/assets/icons/DownIcon";
import Title from "@/components/texts/Title";
import InputSearch from "@/components/inputs/InputSearch";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useGetAllFAQs } from "./api/queries/useGetAllFAQs";
import { useEffect } from "react";
export default function Faqs() {
  const { data: allFAQs, status: statusAllFAQs } = useGetAllFAQs();

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col sm:flex-row lg:items-center justify-between">
        <Title>Frequently Asked Questions</Title>

        <InputSearch placeholder="search questions" />
      </div>
      <div className="flex-1">
        <div className="h-full max-h-[600px] overflow-y-auto space-y-3 ">
          {statusAllFAQs == "loading" &&
            Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="bg-custom_bg_one rounded-xl animate-pulse h-11"
              />
            ))}
          {statusAllFAQs != "loading" &&
            allFAQs?.data?.map((data) => (
              // <Disclosure key={data.id}>
              //   <DisclosureButton className="flex items-center justify-between w-full px-5 py-3 text-xs lg:text-sm font-medium bg-custom_bg_seven rounded-xl group">
              //     {data.question_en}
              //     <DownIcon className="w-2 transition-all duration-200 group-data-[open]:rotate-180" />
              //   </DisclosureButton>
              //   <DisclosurePanel className="mt-3 text-sm lg:text-base font-extralight text-custom_text_two">
              //     {data.answer_en
              //     }
              //   </DisclosurePanel>
              // </Disclosure>
              <Disclosure key={data.id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-5 py-3 text-xs lg:text-sm font-medium bg-custom_bg_seven rounded-xl group">
                      {data.question_en}
                      <DownIcon
                        className={`w-2 transition-transform duration-200 ${
                          open ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel
                      className={`overflow-hidden transition-all duration-300 ease-in-out mt-3 text-sm lg:text-base font-extralight text-custom_text_two ${
                        open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {data.answer_en}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
        </div>
      </div>
    </div>
  );
}
