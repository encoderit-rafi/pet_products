import React, { useCallback, useMemo, useState } from "react";
import UserCardSkeleton from "./components/UserCardSkeleton";
import UserCard from "./components/UserCard";
import Dialog from "@/components/dialogs/Dialog";
import UserForm from "./components/UserForm";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
import { useGetAllUsers } from "@/api/users/useGetAllUsers";
import Pagination from "@/components/pagination";
import { Axios } from "@/axios";

export default function UserTab({ isOpenUser, setIsOpenUser }) {
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [isLoadingDeleteUser, setIsLoadingDeleteUser] = useState(false);
  const [userFormValues, setUserFormValues] = useState({
    type: "create",
    user: null,
  });
  const {
    data: allUsers,
    refetch: fetchAllUsers,
    isLoading: isLoadingAllUsers,
    isFetching: isFetchingAllUsers,
    params: paramsAllUsers,
    setParams: setParamsAllUsers,
  } = useGetAllUsers({
    setToUrl: true,
    isEnabled: true,
  });
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
  async function confirmDeleteUser() {
    setIsLoadingDeleteUser(true);
    const res = await Axios.get(`/users/delete/${userFormValues?.user?.id}`);
    if (res.status === 200) {
      setParamsAllUsers(paramsAllUsers);
      fetchAllUsers();
      setUserFormValues({ type: "create", user: null });
      setIsOpenDeleteUser(false);
    }
    setIsLoadingDeleteUser(false);
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-6 pr-2 mt-2 md:grid-cols-2 xl:grid-cols-3">
        {isLoadingAllUsers || isFetchingAllUsers ? (
          Array.from({ length: 5 }, (_, i) => <UserCardSkeleton key={i} />)
        ) : allUsers?.data?.length > 0 ? (
          allUsers.data.map((user) => (
            <UserCard
              key={user.id}
              data={user}
              onClickEdit={() => {
                setUserFormValues({ type: "update", user });
                setIsOpenUser(true);
              }}
              onClickDelete={() => {
                setUserFormValues({ type: "delete", user });
                setIsOpenDeleteUser(true);
              }}
            />
          ))
        ) : (
          <p className="text-center text-red-500">No data found</p>
        )}
      </div>
      {allUsers?.total > 0 && (
        <Pagination
          {...paginationProps}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
      <Dialog
        isOpen={isOpenUser}
        title={`${
          userFormValues.type == "create" ? "add new" : "update"
        }  user`}
        className="max-w-lg"
      >
        <UserForm
          formValues={userFormValues}
          // handelOnClickCancel={() => setIsOpenUser(false)}
          handelOnClickCancel={() => {
            setUserFormValues({ type: "create", user: null });
            setIsOpenUser(false);
          }}
        />
      </Dialog>
      <DialogConfirmDelete
        text={userFormValues?.user?.name}
        isOpen={isOpenDeleteUser}
        onClickClose={() => {
          // setTempData(null)
          setUserFormValues({ type: "create", user: null });
          setIsOpenDeleteUser(false);
        }}
        onClickDelete={confirmDeleteUser}
        isLoading={isLoadingDeleteUser}
      />
    </>
  );
}
