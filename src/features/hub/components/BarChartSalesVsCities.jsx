import BorderBox from "@/components/box/BorderBox";
import ExportButton from "@/components/buttons/ExportButton";
import BaseBarChart from "@/components/charts/BaseBarChart";
import BaseMenu from "@/components/menus/BaseMenu";
import SubTitle from "@/components/texts/SubTitle";
import React, { useEffect, useState } from "react";
import { useGetSalesAndCitiesBarChart } from "../api/queries/sales_and_cities/useGetSalesAndCitiesBarChart";
import { ranges } from "@/consts";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";

const brands = [
  {
    id: 1,
    name: "brand 1",
    value: "brand_1",
  },
  {
    id: 2,
    name: "brand 2",
    value: "brand_2",
  },
  {
    id: 3,
    name: "brand 3",
    value: "brand_3",
  },
];
export default function BarChartSalesVsCities() {
  const {
    data: dataSalesAndCitiesBarChart,
    searchParams,
    setSearchParams,
  } = useGetSalesAndCitiesBarChart();
  const { data: allBrands } = useGetAllBrands();
  const [brand, setBrand] = useState(null);
  useEffect(() => {
    setSearchParams((old) => ({ ...old, brand_id: brand?.id }));
  }, [brand]);
  return (
    <BorderBox>
      <div className="flex items-center justify-between mb-3">
        <SubTitle>Sales vs Cities</SubTitle>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <BaseMenu
              text="select brand"
              data={
                allBrands?.map((item) => ({
                  id: item.id,
                  name: item.name,
                })) || []
              }
              value={allBrands?.find(
                (item) => item.id == searchParams.brand_id
              )}
              setValue={(item) => setBrand(item)}
            />
          </div>
          <BaseMenu
            data={ranges}
            value={ranges.find((item) => item.value == searchParams.range)}
            setValue={(item) =>
              setSearchParams((old) => ({ ...old, range: item.value }))
            }
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
