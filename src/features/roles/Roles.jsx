import { useEffect, useMemo, useState } from "react";
import Title from "@/components/texts/Title";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import UserForm from "./components/userForm";
import UserCard from "./components/UserCard";
import UserCardSkeleton from "./components/UserCardSkeleton";
import { useGetAllUsers } from "./api/queries/useGetAllUsers";
import { PAGINATION } from "@/consts";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
import Pagination from "@/components/pagination";
import { Axios } from "@/axios";
import { useCallback } from "react";
import Page from "@/components/ui/Page";

export default function Roles() {
  const {
    data: allUsers,
    refetch: fetchAllUsers,
    isLoading: isLoadingAllUsers,
    isFetching: isFetchingAllUsers,
    params: paramsAllUsers,
    setParams: setParamsAllUsers,
  } = useGetAllUsers({ setToUrl: true, isEnabled: true });
  // console.log({ allUsers: allUsers?.data?.data })
  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false);
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [isLoadingDeleteUser, setIsLoadingDeleteUser] = useState(false);
  const [formValues, setFormValues] = useState({ type: "create", user: null });

  async function confirmDeleteUser() {
    setIsLoadingDeleteUser(true);
    const res = await Axios.get(`/users/delete/${formValues?.user?.id}`);
    if (res.status === 200) {
      setParamsAllUsers(paramsAllUsers);
      fetchAllUsers();
      setFormValues({ type: "create", user: null });
      setIsOpenDeleteUser(false);
    }
    setIsLoadingDeleteUser(false);
  }
  const handlePageChange = useCallback(
    (val) => setParamsAllUsers((old) => ({ ...old, page: val })),
    [setParamsAllUsers]
  );
  const handlePerPageChange = useCallback(
    (val) => setParamsAllUsers((old) => ({ ...old, page: 1, per_page: val })),
    [setParamsAllUsers]
  );

  const paginationProps = useMemo(() => {
    return {
      from: allUsers?.from,
      to: allUsers?.to,
      total: allUsers?.total,
      current_page: allUsers?.current_page,
      last_page: allUsers?.last_page,
      per_page: allUsers?.per_page,
    };
  }, [allUsers]);

  return (
    <Page
      title="Assigned Roles"
      actions={
        <BaseButton
          variant="orange"
          icon="plus"
          className="px-3 text-xs max-w-fit lg:px-5"
          onClick={() => setIsOpenCreateUser(true)}
        >
          <span className="hidden lg:block">add new</span>
        </BaseButton>
      }
      footer={
        allUsers?.total > 0 && (
          <Pagination
            {...paginationProps}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        )
      }
    >
      <div className="grid grid-cols-1 gap-6 mt-2 md:grid-cols-2 xl:grid-cols-3 pr-2">
        {isLoadingAllUsers || isFetchingAllUsers ? (
          // Show skeleton loaders when data is loading or fetching
          Array.from({ length: PAGINATION.per_page }, (_, i) => (
            <UserCardSkeleton key={i} />
          ))
        ) : allUsers?.data?.length > 0 ? (
          // Show user cards if data is available
          allUsers.data.map((user) => (
            <UserCard
              key={user.id}
              data={user}
              onClickEdit={() => {
                setFormValues({ type: "update", user });
                setIsOpenUpdateUser(true);
              }}
              onClickDelete={() => {
                setFormValues({ type: "delete", user });
                setIsOpenDeleteUser(true);
              }}
            />
          ))
        ) : (
          // Show "No data found" when data is empty
          <p className="text-center text-red-500">No data found</p>
        )}
      </div>
      <Dialog
        isOpen={isOpenCreateUser}
        title="add new user"
        className="max-w-lg "
      >
        <UserForm
          formValues={formValues}
          handelOnClickCancel={() => setIsOpenCreateUser(false)}
        />
      </Dialog>
      <Dialog
        isOpen={isOpenUpdateUser}
        title="update user"
        className="max-w-lg "
      >
        <UserForm
          formValues={formValues}
          handelOnClickCancel={() => {
            setFormValues({ type: "create", user: null });
            setIsOpenUpdateUser(false);
          }}
        />
      </Dialog>
      <DialogConfirmDelete
        text={formValues?.user?.name}
        isOpen={isOpenDeleteUser}
        onClickClose={() => {
          // setTempData(null)
          setFormValues({ type: "create", user: null });
          setIsOpenDeleteUser(false);
        }}
        onClickDelete={confirmDeleteUser}
        isLoading={isLoadingDeleteUser}
      />
    </Page>
  );
}
