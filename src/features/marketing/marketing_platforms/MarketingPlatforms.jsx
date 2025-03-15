import BorderBox from "@/components/box/BorderBox";
import BaseButton from "@/components/buttons/BaseButton";
import ExportButton from "@/components/buttons/ExportButton";
import BaseMenu from "@/components/menus/BaseMenu";
import Table from "@/components/tables/Table";
import SubTitle from "@/components/texts/SubTitle";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MarketingCategoriesForm from "./MarketingPlatformsForm";
import Dialog from "@/components/dialogs/Dialog";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import { useGetAllCategories } from "@/api/marketing/categories/useGetAllCategories";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
// import { useDeleteCategories } from "@/api/marketing/categories/useDeleteCategories";
import Pagination from "@/components/pagination";
import Page from "@/components/ui/Page";
import MarketingPlatformsForm from "./MarketingPlatformsForm";
import { useDeletePlatform } from "@/api/marketing/platforms/useDeletePlatform";
import { useGetAllPlatform } from "@/api/marketing/platforms/useGetAllPlatform";

export default function MarketingPlatforms() {
  const { mutate: deletePlatform, isLoading: isLoadingDelete } =
    useDeletePlatform();
  const [formValues, setFormValues] = useState({
    type: "create",
    isOpen: false,
    data: null,
  });
  const {
    data,
    isLoading,
    isFetching,
    refetch: fetchCategories,
    setParams,
  } = useGetAllPlatform({
    setToUrl: false,
    isEnabled: true,
  });

  const paginationProps = useMemo(() => {
    return {
      from: data?.from,
      to: data?.to,
      total: data?.total,
      current_page: data?.current_page,
      last_page: data?.last_page,
      per_page: data?.per_page,
    };
  }, [data]);
  useEffect(() => {
    console.log("🚀 ~ MarketingPlatforms ~ data:", data);
  }, [data]);
  // TABLE HEADERS
  const query = useMemo(
    () => ({
      headers: [
        {
          name: "name",
          value: "name",
          cellValue: (row) => <span>{row?.platform || "-"}</span>,
        },

        {
          name: <p className="text-right">actions</p>,
          value: "actions",
          cellValue: (row) => {
            return (
              <div className="flex gap-3 justify-end text-custom_yellow">
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setFormValues({
                      type: "update",
                      isOpen: true,
                      data: row,
                    })
                  }
                >
                  <EditIcon className={"h-4"} />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setFormValues({
                      type: "delete",
                      isOpen: true,
                      data: row,
                    })
                  }
                >
                  <DeleteIcon className={"h-4"} />
                </div>
              </div>
            );
          },
        },
      ],
      isLoading: isLoading || isFetching,
      // isLoading: true,
      data: data?.data || [],
    }),
    [data]
  );
  function confirmDelete() {
    deletePlatform(formValues.data, {
      onSuccess() {
        fetchCategories();
        setFormValues({
          type: "create",
          isOpen: false,
          data: null,
        });
      },
    });
  }
  const handlePageChange = useCallback(
    (val) => setParams((old) => ({ ...old, page: val })),
    [setParams]
  );
  const handlePerPageChange = useCallback(
    (val) => setParams((old) => ({ ...old, page: 1, per_page: val })),
    [setParams]
  );
  return (
    <Page
      header={
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex items-center justify-between ">
            <SubTitle>Marketing Platforms</SubTitle>
            <div className="flex items-center gap-3">
              <BaseButton
                variant="orange"
                className="lg:text-xs font-extralight py-1.5 px-3 rounded-full lg:rounded-full border border-custom_orange"
                onClick={() =>
                  setFormValues((old) => ({
                    ...old,
                    isOpen: true,
                  }))
                }
              >
                add new
              </BaseButton>
            </div>
          </div>
        </div>
      }
      footer={
        data?.total > 0 && (
          <Pagination
            {...paginationProps}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        )
      }
    >
      <BorderBox className={"overflow-hidden"}>
        <Table query={query} />
        <Dialog
          isOpen={formValues.isOpen && formValues.type != "delete"}
          title={`${
            formValues.type == "create" ? "add new" : "update"
          } marketing platform`}
          className="max-w-lg"
        >
          <MarketingPlatformsForm
            formValues={formValues}
            onClose={() =>
              setFormValues({
                type: "create",
                isOpen: false,
                data: null,
              })
            }
          />
        </Dialog>
        <DialogConfirmDelete
          isOpen={formValues.isOpen && formValues.type == "delete"}
          text={formValues?.data?.name}
          onClickClose={() => {
            // setTempData(null)
            setFormValues({ type: "create", isOpen: false, data: null });
            // setIsOpenDeleteUser(false);
          }}
          onClickDelete={confirmDelete}
          isLoading={isLoadingDelete}
        />
      </BorderBox>
    </Page>
  );
}
