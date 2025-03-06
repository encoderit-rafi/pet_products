import { useGetTermsAndPolicies } from "@/api/terms_and_policies/useGetTermsAndPolicies";
import { useUpdateTermsAndPolicies } from "@/api/terms_and_policies/useUpdateTermsAndPolicies";
import BaseButton from "@/components/buttons/BaseButton";
import Editor from "@/components/editor/Editor";
import BaseTabList from "@/components/tabs/BaseTabList";
import Title from "@/components/texts/Title";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
const tabs = [
  {
    id: 0,
    name: "Terms and Conditions",
    value: "terms",
  },
  {
    id: 1,
    name: "Privacy Policy",
    value: "privacy_policy",
  },
];
export default function Terms() {
  const { data, isLoading } = useGetTermsAndPolicies();
  const [mood, setMood] = useState("view");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );
  const {
    mutate: updateTermsAndPolicies,
    isLoading: isLoadingUpdateTermsAndPolicies,
  } = useUpdateTermsAndPolicies();
  useEffect(() => {
    setActiveTab(
      searchParams.get("type") == null
        ? tabs[0]
        : tabs.find((tab) => tab.value == searchParams.get("type"))
    );
  }, [searchParams.get("type")]);

  function handelUpdateTermsAndPolicies() {
    updateTermsAndPolicies(
      {
        data: { type: activeTab.value, details: value },
      },
      {
        onSuccess() {
          toast.success("Update Successfully");
        },
        onError() {
          toast.error("Update Failed");
        },
      }
    );
  }
  function handleValue() {
    data?.length > 0 &&
      setValue(data.find((data) => data.type == activeTab.value)?.details);
  }
  useEffect(() => {
    handleValue();
    // data?.length > 0 &&
    //   setValue(data.find((data) => data.type == activeTab.value)?.details);
  }, [data, activeTab]);

  return (
    <div className="flex flex-col h-full gap-4 text-custom_bg_three">
      <TabGroup>
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <Title>Terms and Conditions</Title>
          <div className="flex items-center gap-4 flex-nowrap">
            <BaseTabList
              list={tabs}
              activeTab={activeTab}
              handelOnChangeTab={(item) => {
                setSearchParams({ type: item.value });
              }}
              className={"flex-nowrap"}
            />
            {mood == "edit" ? (
              <div className="gap-2 flex items-center">
                <BaseButton
                  variant="gradient"
                  className={"w-fit py-2 px-4"}
                  onClick={() => handelUpdateTermsAndPolicies()}
                  isDisabled={isLoadingUpdateTermsAndPolicies}
                  isLoading={isLoadingUpdateTermsAndPolicies}
                >
                  save change
                </BaseButton>
                <BaseButton
                  variant="orange"
                  className={"w-fit py-2 px-4"}
                  onClick={() => {
                    handleValue();
                    setMood("view");
                  }}
                >
                  cancel
                </BaseButton>
              </div>
            ) : (
              <BaseButton
                variant="orange"
                icon={"edit"}
                className={"w-fit py-2 px-4"}
                onClick={() => setMood("edit")}
              >
                Update
              </BaseButton>
            )}
          </div>
        </div>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.id}>
              {isLoading ? (
                "Loading..."
              ) : (
                <div className="mt-2 space-y-5 overflow-y-auto text-sm text-white leading-relaxed lg:text-base font-extralight md:text-justify ">
                  {/* {data?.length > 0 &&
                  data.find(
                    (data) => data.type == (searchParams.get("type") || "terms")
                  )?.details} */}
                  <Editor mood={mood} value={value} setValue={setValue} />
                </div>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
      {/* <Editor /> */}
    </div>
  );
}
