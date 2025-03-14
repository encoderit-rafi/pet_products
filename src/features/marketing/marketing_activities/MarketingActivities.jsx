import BorderBox from "@/components/box/BorderBox";
import BaseButton from "@/components/buttons/BaseButton";
import ExportButton from "@/components/buttons/ExportButton";
import BaseMenu from "@/components/menus/BaseMenu";
import Table from "@/components/tables/Table";
import SubTitle from "@/components/texts/SubTitle";
import React, { useState } from "react";
import MarketingActivitiesForm from "./MarketingActivitiesForm";
import Dialog from "@/components/dialogs/Dialog";

export default function MarketingActivities() {
  const [formValues, setFormValues] = useState({
    isOpen: false,
  });
  return (
    <BorderBox className={"overflow-hidden"}>
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex items-center justify-between ">
          <SubTitle>Marketing Activities</SubTitle>
          <div className="flex items-center gap-3">
            <BaseButton
              variant="orange"
              className="lg:text-xs font-extralight py-1.5 px-3 rounded-full lg:rounded-full border border-custom_orange"
              onClick={() =>
                setFormValues({
                  isOpen: true,
                })
              }
            >
              add new
            </BaseButton>
          </div>
        </div>
      </div>
      {/* <Table query={query} /> */}
      <Dialog
        isOpen={formValues.isOpen}
        title="add new marketing activities"
        className="max-w-lg"
      >
        <MarketingActivitiesForm
          onClose={() =>
            setFormValues({
              isOpen: false,
            })
          }
        />
      </Dialog>
    </BorderBox>
  );
}
