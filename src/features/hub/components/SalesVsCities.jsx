import { useEffect, useState } from "react";
import { ranges } from "@/consts";

import BorderBox from "@/components/box/BorderBox";
import SubTitle from "@/components/texts/SubTitle";
import BaseBarChart from "@/components/charts/BaseBarChart";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";

import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useGetSalesAndCitiesBarChart } from "../api/queries/sales_and_cities/useGetSalesAndCitiesBarChart";

export default function SalesVsCities() {
  const {
    data,
    status,
    params,
    setParams,
    refetch: fetch,

  } = useGetSalesAndCitiesBarChart();
  const { data: allBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const [brands, setBrands] = useState([]);
  const [range, setRange] = useState(() => ranges[0]);
  useEffect(() => {
    brands?.length > 0 && range.value && setParams({
      brand_id: brands.map(item => item.id),
      range: range.value,
    });
  }, [brands, range]);
  useEffect(() => {
    fetch();
  }, [params]);
  useEffect(() => {
    allBrands?.length > 0 && setBrands(allBrands);
  }, [allBrands]);
  return (
    <BorderBox>
      <div className="flex items-center justify-between mb-3">
        <SubTitle>Sales vs Cities</SubTitle>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <BaseDropdown
              multiple
              variant="rounded"
              defaultText="select brands"
              isLoading={isLoadingAllBrands}
              options={allBrands || []}
              selected={brands}
              setSelected={(data) => {
                setBrands((old) => {
                  return old?.some((val) => val?.id == data?.id) ?
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
              data?.id != range?.id &&
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
          data={data?.data?.bar_chart_data || []} //🚧 issues remove slice(1,7)
        />
      </div>
    </BorderBox>
  );
}
