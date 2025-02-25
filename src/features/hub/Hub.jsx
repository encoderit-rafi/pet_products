import { useEffect, useState } from "react";
import Title from "@/components/texts/Title";
import SubTitle from "@/components/texts/SubTitle";
import BorderBox from "@/components/box/BorderBox";
import BasePieChart from "@/components/charts/BasePieChart";
import BaseDatePicker from "@/components/file_pickers/BaseDatePicker";
import PlaceholderImage from "@/components/placeholders/PlaceholderImage";
import TopClients from "./components/TopClients";
import LowestStock from "./components/LowestStock";
import BrandsChart from "./components/BrandsChart";
import SalesVsCities from "./components/SalesVsCities";
import TotalInventory from "./components/TotalInventory";
import BrandsInventory from "./components/BrandsInventory";
import getImageUrl from "@/lib/utils/getImageUrl";
// import ScrollableTable from "@/components/tables/ScrollableTable";

export default function Hub() {
  useEffect(() => {
    console.log(getImageUrl("P103", "logo", "jpg"));
  }, []);
  return (
    <div className="p-1 overflow-x-hidden ">
      <div className="grid grid-cols-12 gap-6">
        {/* heading 1*/}
        <div className="content-center col-span-12">
          <Title>Total Sales</Title>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <BrandsChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <BorderBox>
            <div className="flex items-center justify-between">
              <SubTitle>Best Seller Brand</SubTitle>
              <div className="flex items-center gap-3 ">
                <BaseDatePicker />
              </div>
            </div>
            <div className="relative h-72">
              <BasePieChart />
              <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-custom_text_four">
                <h5 className="text-xl font-medium text-custom_text_one">
                  SR 50,000
                </h5>
                <span className="text-xs font-light text-custom_text_ten">
                  Total Volume
                </span>
              </div>
            </div>
          </BorderBox>
        </div>
        {/* charts 2*/}
        <div className="col-span-12 lg:col-span-8">
          <SalesVsCities />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <TopClients />
        </div>
        {/* heading 2*/}
        <div className="col-span-12">
          <Title>Inventory</Title>
        </div>
        {/* charts 3*/}
        <div className="col-span-12 lg:col-span-8">
          <BrandsInventory />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <LowestStock />
        </div>
        <div className="col-span-12">
          <TotalInventory />
          {/* <ScrollableTable /> */}
        </div>
      </div>
    </div>
  );
}
