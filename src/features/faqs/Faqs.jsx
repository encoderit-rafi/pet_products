import React, { useState } from "react";
import demoData from "@/lib/data/demo";
import Table from "@/components/tables/Table";
import BaseMenu from "@/components/menus/BaseMenu";
import ExportButton from "@/components/buttons/ExportButton";
import BorderBox from "@/components/box/BorderBox";
import PlaceholderImage from "@/components/placeholders/PlaceholderImage";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import InputSearch from "@/components/inputs/InputSearch";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import BoxIcon from "@/assets/icons/BoxIcon";
import DownIcon from "@/assets/icons/DownIcon";
import Title from "@/components/texts/Title";
export default function Faqs() {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col sm:flex-row lg:items-center justify-between">
        <Title>Frequently Asked Questions</Title>
        {/* <div className="flex items-center gap-4 bg-red-300">
        </div> */}
        <InputSearch placeholder="search questions" />
      </div>
      <div className="flex-1">
        <div className="h-full max-h-[600px] overflow-y-auto space-y-3 ">
          <Disclosure>
            <DisclosureButton className="flex items-center justify-between w-full px-5 py-3 text-xs lg:text-sm font-medium bg-custom_bg_seven rounded-xl group">
              Question about app goes here
              <DownIcon className="w-2 transition-all duration-200 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-3 text-sm lg:text-base font-extralight text-custom_text_two">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illor explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur ma gni
              dolores eos qui ratione vwt m ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia noni Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium d e ab illo
              inventore verita tis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
              aut o tione voluptatem sequi nesciunt. Neque porro quisquam est,
              qui dolorem ipsum.
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
