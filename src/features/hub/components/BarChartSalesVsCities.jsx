import BorderBox from "@/components/box/BorderBox";
import ExportButton from "@/components/buttons/ExportButton";
import BaseBarChart from "@/components/charts/BaseBarChart";
import BaseMenu from "@/components/menus/BaseMenu";
import SubTitle from "@/components/texts/SubTitle";
import React, { useEffect, useState } from "react";
import { useGetSalesAndCitiesBarChart } from "../api/queries/sales_and_cities/useGetSalesAndCitiesBarChart";
import { ranges } from "@/consts";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";

// const brands = [
//   {
//     id: 1,
//     name: "brand 1",
//     value: "brand_1",
//   },
//   {
//     id: 2,
//     name: "brand 2",
//     value: "brand_2",
//   },
//   {
//     id: 3,
//     name: "brand 3",
//     value: "brand_3",
//   },
// ];
export default function BarChartSalesVsCities() {
  const {
    data: dataSalesAndCitiesBarChart,
    searchParams,
    setSearchParams,
  } = useGetSalesAndCitiesBarChart();
  const { data: allBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const [brand, setBrand] = useState(() => allBrands);
  const [range, setRange] = useState(() => ranges[0]);
  useEffect(() => {
    setSearchParams((old) => ({ ...old, brand_id: brand?.id }));
  }, [brand]);
  // useEffect(() => {
  //   allBrands && setBrand(allBrands[0]);
  // }, [allBrands]);
  return (
    <BorderBox>
      <div className="flex items-center justify-between mb-3">
        <SubTitle>Sales vs Cities</SubTitle>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <BaseDropdown
              multiple
              variant="rounded"
              defaultText="select brand"
              isLoading={isLoadingAllBrands}
              options={allBrands || []}
              selected={brand}
              setSelected={(data) => {
                setBrand((old) => {
                  return old?.some((val) => val.id == data.id) ?
                    old.filter(val => val.id != data.id) : [...old, data]
                })

              }}
            />
          </div>

          <BaseDropdown
            variant="rounded"
            options={ranges}
            selected={[range]}
            setSelected={(data) => {
              data.id != range.id &&
                setRange(data)

            }}
          />
        </div>
      </div>
      <div className="h-72">
        <BaseBarChart
          xAxisDataKey="city"
          barDataKey="total_revenue"
          tooltipDataKey="units_sold"
          tooltipLabel="units sold:"
          data={dataSalesAndCitiesBarChart?.bar_chart_data.slice(1, 7)} //🚧 issues remove slice(1,7)
        />
      </div>
    </BorderBox>
  );
}
