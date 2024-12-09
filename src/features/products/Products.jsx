import React from "react";
import Table from "@/components/Table";
import SearchIcon from "@/assets/icons/SearchIcon";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import BoxIcon from "@/assets/icons/BoxIcon";

const demoData = [
  {
    id: 1,
    name: "Product A",
    sku: "SKU001",
    brand: "BrandX",
    category: "Home Appliances",
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
  {
    id: 7,
    name: "Product G",
    sku: "SKU007",
    brand: "BrandY",
    category: "Home Appliances",
    total_units_sold: 205,
    total_sales_value: 7348,
    criteria_category: "High Demand",
  },
  {
    id: 8,
    name: "Product H",
    sku: "SKU008",
    brand: "BrandX",
    category: "Sports",
    total_units_sold: 266,
    total_sales_value: 18810,
    criteria_category: "High Demand",
  },
  {
    id: 9,
    name: "Product I",
    sku: "SKU009",
    brand: "BrandZ",
    category: "Sports",
    total_units_sold: 390,
    total_sales_value: 13015,
    criteria_category: "Low Demand",
  },
  {
    id: 10,
    name: "Product J",
    sku: "SKU010",
    brand: "BrandX",
    category: "Toys",
    total_units_sold: 245,
    total_sales_value: 12027,
    criteria_category: "Low Demand",
  },
  {
    id: 11,
    name: "Product K",
    sku: "SKU011",
    brand: "BrandX",
    category: "Electronics",
    total_units_sold: 224,
    total_sales_value: 7812,
    criteria_category: "Low Demand",
  },
  {
    id: 12,
    name: "Product L",
    sku: "SKU012",
    brand: "BrandY",
    category: "Sports",
    total_units_sold: 64,
    total_sales_value: 7951,
    criteria_category: "Moderate Demand",
  },
  {
    id: 13,
    name: "Product M",
    sku: "SKU013",
    brand: "BrandX",
    category: "Home Appliances",
    total_units_sold: 393,
    total_sales_value: 21997,
    criteria_category: "High Demand",
  },
  {
    id: 14,
    name: "Product N",
    sku: "SKU014",
    brand: "BrandA",
    category: "Sports",
    total_units_sold: 179,
    total_sales_value: 3242,
    criteria_category: "Low Demand",
  },
  {
    id: 15,
    name: "Product O",
    sku: "SKU015",
    brand: "BrandA",
    category: "Sports",
    total_units_sold: 228,
    total_sales_value: 44427,
    criteria_category: "High Demand",
  },
  {
    id: 16,
    name: "Product P",
    sku: "SKU016",
    brand: "BrandB",
    category: "Furniture",
    total_units_sold: 129,
    total_sales_value: 8750,
    criteria_category: "High Demand",
  },
  {
    id: 17,
    name: "Product Q",
    sku: "SKU017",
    brand: "BrandB",
    category: "Electronics",
    total_units_sold: 95,
    total_sales_value: 30834,
    criteria_category: "Moderate Demand",
  },
  {
    id: 18,
    name: "Product R",
    sku: "SKU018",
    brand: "BrandX",
    category: "Toys",
    total_units_sold: 359,
    total_sales_value: 9754,
    criteria_category: "Moderate Demand",
  },
  {
    id: 19,
    name: "Product S",
    sku: "SKU019",
    brand: "BrandB",
    category: "Clothing",
    total_units_sold: 453,
    total_sales_value: 13610,
    criteria_category: "Moderate Demand",
  },
  {
    id: 20,
    name: "Product T",
    sku: "SKU020",
    brand: "BrandX",
    category: "Home Appliances",
    total_units_sold: 30,
    total_sales_value: 37389,
    criteria_category: "Moderate Demand",
  },
  {
    id: 21,
    name: "Product U",
    sku: "SKU021",
    brand: "BrandA",
    category: "Furniture",
    total_units_sold: 318,
    total_sales_value: 31264,
    criteria_category: "High Demand",
  },
  {
    id: 22,
    name: "Product V",
    sku: "SKU022",
    brand: "BrandZ",
    category: "Sports",
    total_units_sold: 241,
    total_sales_value: 31662,
    criteria_category: "High Demand",
  },
  {
    id: 23,
    name: "Product W",
    sku: "SKU023",
    brand: "BrandY",
    category: "Electronics",
    total_units_sold: 442,
    total_sales_value: 4488,
    criteria_category: "Low Demand",
  },
  {
    id: 24,
    name: "Product X",
    sku: "SKU024",
    brand: "BrandB",
    category: "Furniture",
    total_units_sold: 363,
    total_sales_value: 45801,
    criteria_category: "Moderate Demand",
  },
  {
    id: 25,
    name: "Product Y",
    sku: "SKU025",
    brand: "BrandB",
    category: "Toys",
    total_units_sold: 193,
    total_sales_value: 41997,
    criteria_category: "Moderate Demand",
  },
  {
    id: 26,
    name: "Product Z",
    sku: "SKU026",
    brand: "BrandY",
    category: "Clothing",
    total_units_sold: 357,
    total_sales_value: 20972,
    criteria_category: "Moderate Demand",
  },
  {
    id: 27,
    name: "Product A",
    sku: "SKU027",
    brand: "BrandZ",
    category: "Furniture",
    total_units_sold: 372,
    total_sales_value: 26773,
    criteria_category: "Low Demand",
  },
  {
    id: 28,
    name: "Product B",
    sku: "SKU028",
    brand: "BrandB",
    category: "Clothing",
    total_units_sold: 62,
    total_sales_value: 36529,
    criteria_category: "Low Demand",
  },
  {
    id: 29,
    name: "Product C",
    sku: "SKU029",
    brand: "BrandX",
    category: "Furniture",
    total_units_sold: 205,
    total_sales_value: 33263,
    criteria_category: "High Demand",
  },
  {
    id: 30,
    name: "Product D",
    sku: "SKU030",
    brand: "BrandA",
    category: "Electronics",
    total_units_sold: 84,
    total_sales_value: 16159,
    criteria_category: "Moderate Demand",
  },
  {
    id: 31,
    name: "Product E",
    sku: "SKU031",
    brand: "BrandA",
    category: "Furniture",
    total_units_sold: 476,
    total_sales_value: 46709,
    criteria_category: "High Demand",
  },
  {
    id: 32,
    name: "Product F",
    sku: "SKU032",
    brand: "BrandX",
    category: "Home Appliances",
    total_units_sold: 39,
    total_sales_value: 31516,
    criteria_category: "Low Demand",
  },
  {
    id: 33,
    name: "Product G",
    sku: "SKU033",
    brand: "BrandA",
    category: "Electronics",
    total_units_sold: 182,
    total_sales_value: 30140,
    criteria_category: "High Demand",
  },
  {
    id: 34,
    name: "Product H",
    sku: "SKU034",
    brand: "BrandB",
    category: "Furniture",
    total_units_sold: 86,
    total_sales_value: 24070,
    criteria_category: "Moderate Demand",
  },
  {
    id: 35,
    name: "Product I",
    sku: "SKU035",
    brand: "BrandY",
    category: "Home Appliances",
    total_units_sold: 72,
    total_sales_value: 25500,
    criteria_category: "High Demand",
  },
];
const query = {
  headers: [
    {
      name: "name",
      value: "name",
      cellValue: (row) => {
        return row?.name;
      },
    },
    {
      name: "sku",
      value: "sku",
      cellValue: (row) => {
        return row?.sku;
      },
    },
    {
      name: "brand",
      value: "brand",
      cellValue: (row) => {
        return row?.brand;
      },
    },
    {
      name: "category",
      value: "category",
      cellValue: (row) => {
        return row?.category;
      },
    },
    {
      name: "total units sold",
      value: "total_units_sold",
      cellValue: (row) => {
        return row?.total_units_sold;
      },
    },
    {
      name: "total units sold",
      value: "total_units_sold",
      cellValue: (row) => {
        return row?.total_units_sold;
      },
    },
    {
      name: "criteria category",
      value: "criteria_category",
      cellValue: (row) => {
        return row?.criteria_category;
      },
    },
  ],
  isLoading: false,
  data: demoData,
};
export default function Products() {
  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">dashboard</h2>
        <div className="flex items-center gap-2">
          <div className="relative ">
            <input
              type="email"
              name=""
              id=""
              placeholder="Search"
              className="w-full py-3 pl-10 text-white bg-transparent border-b-2 peer focus:bg-transparent focus:border-b-white border-b-gray-400 focus:outline-none"
            />
            <div className="absolute text-gray-400 -translate-y-1/2 top-1/2 size-6 peer-focus:text-white">
              <SearchIcon className="size-full" />
            </div>
          </div>
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
              Options
              <BoxIcon className="size-4 fill-white/60" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl bg-[#21272b] p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 space-y-2"
            >
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  Duplicate
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  Archive
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <Table query={query} />
    </div>
  );
}
