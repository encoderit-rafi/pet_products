import BaseTabList from "@/components/tabs/BaseTabList";
import Title from "@/components/texts/Title";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { useGetTermsAndPolicies } from "./api/queries/useGetTermsAndPolicies";
import { useEffect, useState } from "react";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );
  // const [activeTab, setActiveTab] = useState();
  // const [currentData, setCurrentData] = useState(
  //   () => data?.find((data) => data.type == activeTab.value)?.details
  // );
  useEffect(() => {
    setActiveTab(
      searchParams.get("type") == null
        ? tabs[0]
        : tabs.find((tab) => tab.value == searchParams.get("type"))
    );
  }, [searchParams.get("type")]);
  // useEffect(() => {
  //   setCurrentData(data?.find((data) => data.type == activeTab.value)?.details);
  // }, [activeTab]);
  return (
    <div className="flex flex-col h-full gap-4 text-custom_bg_three">
      <TabGroup>
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <Title>Terms and Conditions</Title>
          <div className="flex items-center gap-4">
            <BaseTabList
              list={tabs}
              activeTab={activeTab}
              handelOnChangeTab={(item) => {
                console.log("✅ ~ file: Terms.jsx:40 ~ Terms ~ item:", item);

                setSearchParams({ type: item.value });
              }}
            />
          </div>
        </div>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.id}>
              <div className="mt-2 space-y-5 overflow-y-auto text-sm leading-relaxed lg:text-base font-extralight md:text-justify ">
                {data?.length > 0 &&
                  data.find(
                    (data) => data.type == (searchParams.get("type") || "terms")
                  )?.details}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
