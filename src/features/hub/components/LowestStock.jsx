import { useGetAllBrands } from "@/api/brands/queries/useGetAllBrands";
import BorderBox from "@/components/box/BorderBox";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";
import Table from "@/components/tables/Table";
import SubTitle from "@/components/texts/SubTitle";
import { omitEmpty, ranges } from "@/consts";
import React, { useEffect, useMemo, useState } from "react";
import { useGetAllLowestStocks } from "../api/queries/lowest_stocks/useGetAllLowestStocks";
const demoData = [
  {
    id: 1,
    name: "Product A",
    sku: "SKU001",
    brand: "BrandX",
    category: "Hub Appliances",
    total_units_sold: 499,
    total_sales_value: 28800,
    criteria_category: "High Demand",
  },
  {
    id: 2,
    name: "Product B",
    sku: "SKU002",
    brand: "BrandY",
    category: "Sports",
    total_units_sold: 430,
    total_sales_value: 36454,
    criteria_category: "Moderate Demand",
  },
  {
    id: 3,
    name: "Product C",
    sku: "SKU003",
    brand: "BrandX",
    category: "Sports",
    total_units_sold: 242,
    total_sales_value: 14181,
    criteria_category: "High Demand",
  },
  {
    id: 4,
    name: "Product D",
    sku: "SKU004",
    brand: "BrandB",
    category: "Sports",
    total_units_sold: 490,
    total_sales_value: 37496,
    criteria_category: "Low Demand",
  },
  {
    id: 5,
    name: "Product E",
    sku: "SKU005",
    brand: "BrandX",
    category: "Clothing",
    total_units_sold: 69,
    total_sales_value: 10489,
    criteria_category: "Moderate Demand",
  },
  {
    id: 6,
    name: "Product F",
    sku: "SKU006",
    brand: "BrandX",
    category: "Sports",
    total_units_sold: 461,
    total_sales_value: 26846,
    criteria_category: "High Demand",
  },
];

export default function LowestStock() {
  const {
    data: allLowestStocks,
    status: statusAllLowestStocks,
    params: paramsAllLowestStocks,
    refetch: fetchAllLowestStocks,
    setParams: setParamsAllLowestStocks,
  } = useGetAllLowestStocks();
  const { data: allBrands, isLoading: isLoadingAllBrands } = useGetAllBrands();
  const [brands, setBrands] = useState([]);
  const [range, setRange] = useState(() => ranges[0]);
  const query = useMemo(
    () => ({
      headers: [
        {
          name: "Brand",
          value: "name",
          cellValue: (row) => {
            return row.name;
          },
        },
        {
          name: "Products (Qn)",
          value: "products_count",
          cellValue: (row) => {
            return row.products_count;
          },
        },
        {
          name: "Stocks",
          value: "total_remaining_stock",
          cellValue: (row) => {
            return row?.total_remaining_stock;
          },
        },
      ],
      isLoading: statusAllLowestStocks == "loading",
      data: allLowestStocks?.data || [],
      className: {
        table: {
          tbody: {
            tbody: "max-h-72",
          },
        },
      },
    }),
    [allLowestStocks]
  );
  const queryLoading = {
    headers: [
      {
        name: "Brand",
        value: "name",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
              <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
            </div>
          );
        },
      },
      {
        name: "Stocks",
        value: "total_remaining_stock",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
              <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
            </div>
          );
        },
      },
    ],
    isLoading: statusAllLowestStocks == "loading",
    data: Array.from({ length: 10 }, (_, i) => i),
  };
  useEffect(() => {
    setParamsAllLowestStocks(
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
    fetchAllLowestStocks();
  }, [paramsAllLowestStocks]);
  return (
    <BorderBox className={"lg:pr-[14px]"}>
      <div className="flex items-center justify-between ">
        <SubTitle>Lowest Stock</SubTitle>
        <div className="flex items-center gap-1 pr-[14px]">
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
      <div className="h-96 mt-2">
        <Table
          query={statusAllLowestStocks == "loading" ? queryLoading : query}
        />
      </div>
    </BorderBox>
  );
}
