import { useEffect, useState } from "react";
import { omitEmpty, ranges } from "@/consts";

import BorderBox from "@/components/box/BorderBox";
import SubTitle from "@/components/texts/SubTitle";
import BaseBarChart from "@/components/charts/BaseBarChart";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";

import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useGetSalesAndCitiesBarChart } from "../api/queries/sales_and_cities/useGetSalesAndCitiesBarChart";

export default function SalesVsCities() {
  const {
    data: cityBarChart,
    status: statusCityBarChart,
    params: paramsCityBarChart,
    refetch: fetchCityBarChart,
    setParams: setParamsCityBarChart,
  } = useGetSalesAndCitiesBarChart();
  const { data: allBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const [brands, setBrands] = useState([]);
  const [range, setRange] = useState(() => ranges[0]);
  useEffect(() => {
    setParamsCityBarChart(
      omitEmpty({
        brand_ids: brands.map((item) => item.id).join(","),
        range: range.value,
      })
    );
  }, [brands, range]);

  useEffect(() => {
    ranges.length > 0 && setRange(ranges[0]);
  }, [ranges]);
  useEffect(() => {
    fetchCityBarChart();
  }, [paramsCityBarChart]);

  return (
    <BorderBox>
      <div className="flex items-center justify-between mb-3">
        <SubTitle>Sales vs Cities</SubTitle>
        <div className="flex items-center gap-3">
          <BaseDropdown
            multiple
            variant="rounded"
            defaultText="select brands"
            isLoading={isLoadingAllBrands}
            options={allBrands || []}
            selected={brands}
            setSelected={(data) => {
              setBrands((old) => {
                return old?.some((val) => val?.id == data?.id)
                  ? old.filter((val) => val.id != data.id)
                  : [...old, data];
              });
            }}
          />

          <BaseDropdown
            variant="rounded"
            options={ranges}
            selected={[range]}
            setSelected={(data) => {
              data?.id != range?.id && setRange(data);
            }}
          />
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto h-72">
        <BaseBarChart
          xAxisDataKey="city"
          barDataKey="total_revenue"
          tooltipDataKey="total_revenue"
          tooltipLabel="city"
          tooltipPrefix="SAR"
          data={cityBarChart?.bar_chart_data || []} //🚧 issues remove slice(1,7)
          max={cityBarChart?.max_value}
        />
      </div>
    </BorderBox>
  );
}
