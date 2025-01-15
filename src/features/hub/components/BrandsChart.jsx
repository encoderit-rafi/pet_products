import { useEffect, useState } from "react";
import { ranges } from "@/consts";

import BorderBox from "@/components/box/BorderBox";
import SubTitle from "@/components/texts/SubTitle";
import BaseBarChart from "@/components/charts/BaseBarChart";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useBrandsBarChart } from "../api/queries/brands/useBrandsBarChart";

export default function BrandsChart() {
  const {
    data: brandsBarChart,
    status: statusBrandsBarChart,
    params: paramsBrandsBarChart,
    refetch: fetchBrandsBarChart,
    setParams: setParamsBrandsBarChart,
  } = useBrandsBarChart();
  const { data: allBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const [brands, setBrands] = useState([]);
  const [range, setRange] = useState(() => ranges[0]);

  useEffect(() => {
    brands?.length > 0 &&
      range.value &&
      setParamsBrandsBarChart({
        brand_id: brands.map((item) => item.id),
        range: range.value,
      });
  }, [brands, range]);

  useEffect(() => {
    console.log(
      "✅ ~ file: BrandsChart.jsx:35 ~ useEffect ~ brandsBarChart:",
      brandsBarChart
    );
  }, [brandsBarChart]);
  useEffect(() => {
    fetchBrandsBarChart();
  }, []);

  useEffect(() => {
    fetchBrandsBarChart();
  }, [paramsBrandsBarChart]);

  // useEffect(() => {
  //   allBrands?.length > 0 && setBrands(allBrands);
  // }, [allBrands]);
  return (
    <BorderBox>
      <div className="flex items-center justify-between mb-3">
        <SubTitle>Brands Chart</SubTitle>
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
                  return old?.some((val) => val?.id == data?.id)
                    ? old.filter((val) => val.id != data.id)
                    : [...old, data];
                });
              }}
            />
          </div>
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
          xAxisDataKey="name"
          barDataKey="total_revenue"
          tooltipDataKey="total_revenue"
          tooltipLabel="units sold:"
          data={brandsBarChart?.bar_chart_data || []}
          // data={[]}
        />
      </div>
    </BorderBox>
  );
}
