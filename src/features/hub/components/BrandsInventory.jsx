import { useEffect, useState } from "react";
import { omitEmpty, ranges } from "@/consts";

import BorderBox from "@/components/box/BorderBox";
import SubTitle from "@/components/texts/SubTitle";
import BaseBarChart from "@/components/charts/BaseBarChart";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import { useInventoriesBarChart } from "../api/queries/inventories/useInventoriesBarChart";
export default function BrandsInventory() {
  const {
    data: inventoriesBarChart,
    status: statusInventoriesBarChart,
    params: paramsInventoriesBarChart,
    refetch: fetchInventoriesBarChart,
    setParams: setParamsInventoriesBarChart,
  } = useInventoriesBarChart();
  const { data: allBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const [brands, setBrands] = useState([]);
  const [range, setRange] = useState(() => ranges[0]);
  useEffect(() => {
    setParamsInventoriesBarChart(
      omitEmpty({
        brand_ids: brands?.map((item) => item.id).join(","),
        range: range.value,
      })
    );
  }, [brands, range]);

  useEffect(() => {
    ranges.lenght > 0 && setRange(ranges[0]);
  }, [ranges]);
  useEffect(() => {
    fetchInventoriesBarChart();
  }, [paramsInventoriesBarChart]);

  return (
    <BorderBox>
      <div className="flex items-center justify-between mb-3">
        <SubTitle>Brands Inventory</SubTitle>
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
      <div className="overflow-x-auto overflow-y-auto h-96">
        <BaseBarChart
          xAxisDataKey="name"
          barDataKey="total_remaining_stock"
          tooltipDataKey="total_remaining_stock"
          tooltipLabel="name"
          // tooltipPrefix="UNITS"
          data={inventoriesBarChart?.bar_chart_data || []}
          max={inventoriesBarChart?.max_value}
          showIcon
        />
      </div>
    </BorderBox>
  );
}
