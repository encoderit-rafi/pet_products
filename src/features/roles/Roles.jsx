import { useEffect, useState } from "react";
import Title from "@/components/texts/Title";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import UserForm from "./components/userForm";
import UserCard from "./components/UserCard";
import UserCardSkeleton from "./components/UserCardSkeleton";
import DownIcon from "@/assets/icons/DownIcon";
import BaseInput from "@/components/inputs/BaseInput";
import IconButton from "@/components/buttons/IconButton";
import Label from "@/components/texts/Label";
import { useGetAllUsers } from "./api/queries/useGetAllUsers";
// import { useDebounce } from "react-use";
import { debounce, PAGINATION } from "@/consts";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
import { useDeleteUser } from "./api/mutations/useDeleteUser";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/pagination";
import { Axios } from "@/axios";

export default function Roles() {
  const {
    data: allUsers,
    refetch: fetchAllUsers,
    isLoading: isLoadingAllUsers,
    isFetching: isFetchingAllUsers,
    params: paramsAllUsers,
    setParams: setParamsAllUsers,
  } = useGetAllUsers({ setToUrl: true, isEnabled: false });
  // const {
  //   mutate: deleteUser,
  //   isLoading: isLoadingDeleteUser,
  //   isError: isErrorDeleteUser
  // } = useDeleteUser({ setToUrl: true, isEnabled: false });

  useEffect(() => {
    fetchAllUsers();
  }, []);
  useEffect(() => {
    fetchAllUsers();
  }, [paramsAllUsers]);


  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false);
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [isLoadingDeleteUser, setIsLoadingDeleteUser] = useState(false);
  const [formValues, setFormValues] = useState({ type: "create", user: null });

  async function confirmDeleteUser() {
    // deleteUser(formValues?.user, {
    //   onSuccess: () => {
    //     setParamsAllUsers(paramsAllUsers)
    //     fetchAllUsers();
    //     setFormValues({ type: "create", user: null });
    //     setIsOpenDeleteUser(false);
    //   },
    // });
    setIsLoadingDeleteUser(true)
    const res = await Axios.get(`/users/delete/${formValues?.user?.id}`)
    if (res.status === 200) {
      setParamsAllUsers(paramsAllUsers)
      fetchAllUsers();
      setFormValues({ type: "create", user: null });
      setIsOpenDeleteUser(false);
    }
    setIsLoadingDeleteUser(false)
  }
  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <Title> Assigned Roles</Title>

        <div className="flex items-center gap-4">
          <BaseButton
            variant="orange"
            icon="plus"
            className="px-3 text-xs max-w-fit lg:px-5"
            onClick={() => setIsOpenCreateUser(true)}
          >
            <span className="hidden lg:block">add new</span>
          </BaseButton>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-6 mt-2 md:grid-cols-2 xl:grid-cols-3">
          {!isLoadingAllUsers &&
            !isFetchingAllUsers &&
            allUsers?.data?.length > 0
            ? allUsers.data.map((user) => (
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
            : Array.from({ length: PAGINATION.per_page }, (_, i) => (
              <UserCardSkeleton key={i} />
            ))}
        </div>
      </div>

      {allUsers && (
        <Pagination
          to={allUsers?.to}
          total={allUsers?.total}
          current_page={allUsers?.current_page}
          last_page={allUsers?.last_page}
          per_page={allUsers?.per_page}
          onPageChange={(val) =>
            setParamsAllUsers((old) => ({ ...old, page: val }))
          }
          onPerPageChange={(val) =>
            setParamsAllUsers((old) => ({ page: 1, per_page: val }))
          }
        />
      )}

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
    </div>
  );
}
