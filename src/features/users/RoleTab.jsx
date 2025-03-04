import Dialog from "@/components/dialogs/Dialog";
import React, { useState } from "react";
import RoleForm from "./components/RoleForm";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
import { useDeleteRole } from "@/api/roles/useDeleteRole";
import { useGetAllRoles } from "@/api/roles/useGetAllRoles";
import RoleCardSkeleton from "./components/RoleCardSkeleton";
import RoleCard from "./components/RoleCard";

export default function RoleTab({ isOpenRole, setIsOpenRole }) {
  // const [isOpenRole, setIsOpenRole] = useState(false);
  const [isOpenDeleteRole, setIsOpenDeleteRole] = useState(false);
  const [roleFormValues, setRoleFormValues] = useState({
    type: "create",
    role: null,
  });

  const {
    data: allRoles,
    refetch: fetchAllRoles,
    isLoading: isLoadingAllRoles,
    isFetching: isFetchingAllRoles,
  } = useGetAllRoles({ isEnabled: true });
  const { mutate: deleteRole, isLoading: isLoadingDeleteRole } =
    useDeleteRole();
  async function confirmDeleteRole() {
    deleteRole(roleFormValues.role, {
      onSuccess() {
        fetchAllRoles();
        setRoleFormValues({ type: "create", role: null });
        setIsOpenDeleteRole(false);
      },
    });
  }
  return (
    <div className="grid grid-cols-1 gap-6 pr-2 mt-2 md:grid-cols-2 xl:grid-cols-3">
      {isLoadingAllRoles || isFetchingAllRoles ? (
        Array.from({ length: 5 }, (_, i) => <RoleCardSkeleton key={i} />)
      ) : allRoles?.data?.length > 0 ? (
        allRoles.data.map((role) => (
          <RoleCard
            key={role.id}
            data={role}
            onCLickView={() => {
              setRoleFormValues({ type: "view", role });
              setIsOpenRole(true);
            }}
            onClickEdit={() => {
              setRoleFormValues({ type: "update", role });
              setIsOpenRole(true);
            }}
            onClickDelete={() => {
              setRoleFormValues({ type: "delete", role });
              setIsOpenDeleteRole(true);
            }}
          />
        ))
      ) : (
        <p className="text-center text-red-500">No data found</p>
      )}
      <Dialog
        isOpen={isOpenRole}
        title={`${
          roleFormValues.type == "view"
            ? "view"
            : roleFormValues.type == "create"
            ? "add new"
            : "update"
        }  role`}
        className="max-w-lg"
      >
        <RoleForm
          formValues={roleFormValues}
          handelOnClickCancel={() => {
            setRoleFormValues({ type: "create", role: null });
            setIsOpenRole(false);
          }}
        />
      </Dialog>
      <DialogConfirmDelete
        text={roleFormValues?.role?.name}
        isOpen={isOpenDeleteRole}
        onClickClose={() => {
          // setTempData(null)
          setRoleFormValues({ type: "create", role: null });
          setIsOpenDeleteRole(false);
        }}
        onClickDelete={confirmDeleteRole}
        isLoading={isLoadingDeleteRole}
      />
    </div>
  );
}
