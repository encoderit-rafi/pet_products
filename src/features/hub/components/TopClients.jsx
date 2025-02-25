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
  const query = useMemo(
    () => ({
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
    }),
    [allTopClients]
  );

  useEffect(() => {
    setParamsAllTopClients(
      omitEmpty({
        range: range.value,
      })
    );
  }, [range]);

  useEffect(() => {
    ranges.lenght > 0 && setRange(ranges[0]);
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
      <div className="mt-2 h-96">
        <Table query={query} />
      </div>
    </BorderBox>
  );
}
