import React from "react";

export default function MarketingActivities() {
  return (
    <BorderBox className={"overflow-hidden"}>
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex items-center justify-between ">
          <SubTitle>Criteria</SubTitle>
          <div className="flex items-center gap-3">
            <BaseMenu
              text="select category"
              data={categories}
              value={category}
              setValue={(item) => setCategory(item)}
            />
            <div className="items-center hidden gap-3 lg:flex">
              <BaseButton
                variant="orange"
                className="lg:text-xs font-extralight py-1.5 px-3 rounded-full lg:rounded-full border border-custom_orange"
                onClick={() => setIsOpenAddNewCriteria(true)}
              >
                add new
              </BaseButton>
              <ExportButton />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <BaseButton
            variant="orange"
            className=" text-[11px]  py-1.5 px-3 rounded-full lg:rounded-full"
            onClick={() => setIsOpenAddNewCriteria(true)}
          >
            add new
          </BaseButton>
          <ExportButton />
        </div>
      </div>
      <Table query={query} />
    </BorderBox>
  );
}
