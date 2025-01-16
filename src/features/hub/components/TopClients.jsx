import { useEffect, useMemo, useState } from "react";

import Table from "@/components/tables/Table";
import BorderBox from "@/components/box/BorderBox";
import SubTitle from "@/components/texts/SubTitle";
import InputSearch from "@/components/inputs/InputSearch";
import BaseDropdown from "@/components/dropdowns/BaseDropdown";

import { omitEmpty, ranges } from "@/consts";
import { useGetAllTopClients } from "../api/queries/top_clients/useGetAllTopClients";

export default function TopClients() {
  const {
    data: allTopClients,
    status: statusAllTopClients,
    params: paramsAllTopClients,
    refetch: fetchAllTopClients,
    setParams: setParamsAllTopClients,
  } = useGetAllTopClients();
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(() => ranges[0]);
  const handelSearch = () => {
    setParamsAllTopClients((old) => ({ ...old, search: search }));
  };
  const query = useMemo(() => ({
    headers: [
      // {
      //   name: "SAP Code",
      //   value: "sap_client_code",
      //   cellValue: (row) => {
      //     return row.sap_client_code;
      //   },
      // },
      {
        name: "name",
        value: "name_en",
        cellValue: (row) => {
          return row.name_en;
        },
      },
      // {
      //   name: "Quantity",
      //   value: "invoice_quantity",
      //   cellValue: (row) => {
      //     return row?.invoice_quantity;
      //   },
      // },
      {
        name: "Sales Amount",
        value: "invoice_value",
        cellValue: (row) => {
          return row?.invoice_value;
        },
      },
    ],
    isLoading: statusAllTopClients == "loading",
    data: allTopClients?.data || [],
  }), [allTopClients]);
  const queryLoading = {
    headers: [
      // {
      //   name: "SAP Code",
      //   value: "sap_client_code",
      //   cellValue: (row) => {
      //     return (
      //       <div className="flex items-center gap-3">
      //         <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
      //         <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
      //       </div>
      //     );
      //   },

      // },
      {
        name: "name",
        value: "name_en",
        cellValue: (row) => {
          return (
            <div className="flex items-center gap-3">
              <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
              <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
            </div>
          );
        },

      },
      // {
      //   name: "Quantity",
      //   value: "invoice_quantity",
      //   cellValue: (row) => {
      //     return (
      //       <div className="flex items-center gap-3">
      //         <div className="rounded-full size-5 bg-custom_bg_one animate-pulse" />
      //         <div className="w-32 h-3 rounded-full bg-custom_bg_one animate-pulse" />
      //       </div>
      //     );
      //   },

      // },
      {
        name: "Sales Amount",
        value: "invoice_value",
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
    isLoading: statusAllTopClients == "loading",
    data: Array.from({ length: 10 }, (_, i) => i),

  }


  useEffect(() => {
    setParamsAllTopClients(omitEmpty({
      range: range.value,
    }));
  }, [range]);

  useEffect(() => {
    ranges.lenght > 0 && setRange(ranges[0])
  }, [ranges]);
  useEffect(() => {
    fetchAllTopClients();
  }, [paramsAllTopClients]);
  return (
    <BorderBox>
      <div className="flex items-center justify-between">
        <SubTitle>Top Clients</SubTitle>
        <div className="flex items-center gap-1">
          <form
            className="w-20 ml-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handelSearch();
            }}
          >
            <InputSearch
              className="pr-1 py-1.5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
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
      <div className="h-72">
        <Table query={statusAllTopClients == "loading" ? queryLoading : query} />
      </div>
    </BorderBox>
  );
}
