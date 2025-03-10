import { useEffect, useState } from "react";
import { omitEmpty, ranges } from "@/consts";

import BorderBox from "@/components/box/BorderBox";
import SubTitle from "@/components/texts/SubTitle";
import BaseBarChart from "@/components/charts/BaseBarChart";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import { useGetAllBrands } from "@/api/brands/useGetAllBrands";
import { useBrandsBarChart } from "../api/queries/brands/useBrandsBarChart";
import BrandSelect from "@/components/BrandSelect";

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
  // const [range, setRange] = useState(() => ranges[0]);
  const [range, setRange] = useState();

  useEffect(() => {
    setParamsBrandsBarChart(
      omitEmpty({
        brand_ids: brands?.map((item) => item.id).join(","),
        range: range?.value,
      })
    );
  }, [brands, range]);

  useEffect(() => {
    ranges.lenght > 0 && setRange(ranges[0]);
  }, [ranges]);
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
          <BrandSelect />
          {/* <BaseDropdown
            multiple
            variant="rounded"
            defaultText="select brands"
            isLoading={isLoadingAllBrands}
            options={allBrands || []}
            selected={brands}
            setSelected={(data) => {
              setBrands((old) => {
                return old?.some((val) => val?.id == data?.id)
                  ? old?.filter((val) => val.id != data.id)
                  : [...old, data];
              });
            }}
          /> */}
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
      <div className="overflow-x-auto overflow-y-auto h-96">
        <BaseBarChart
          showIcon
          xAxisDataKey="name"
          barDataKey="total_revenue"
          tooltipDataKey="total_revenue"
          tooltipLabel="name"
          tooltipPrefix="SAR"
          data={brandsBarChart?.bar_chart_data || []}
          max={brandsBarChart?.max_value}
        />
      </div>
    </BorderBox>
  );
}
