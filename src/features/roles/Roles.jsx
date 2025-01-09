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

export default function Roles() {
  const { data: allUsers, refetch: refetchAllUsers, isLoading: isLoadingAllUsers, isFetching: isFetchingAllUsers, states,
    setStates } = useGetAllUsers({ setToUrl: true, isEnabled: true });
  console.log("✅ ~ file: Roles.jsx:12 ~ Roles ~ allUsers:", allUsers);
  const { mutate: deleteUser, isLoading: isLoadingDeleteUser, isError: isErrorDeleteUser } =
    useDeleteUser();
  const [page, setPage] = useState(states.page);
  const [perPage, setPerPage] = useState(states.per_page);
  const [tempData, setTempData] = useState(null);
  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false);
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [formValues, setFormValues] = useState({ type: 'create', user: null });
  useEffect(() => {
    // debounce(
    //   setStates({ page: 1, per_page: perPage })
    // )
    setStates({ page: 1, per_page: perPage })
  }, [perPage]);
  useEffect(() => {
    // debounce(
    //   setStates((old) => ({ ...old, page }))
    // )
    setStates((old) => ({ ...old, page }))
  }, [page]);
  useEffect(() => {
    refetchAllUsers()
  }, [page, perPage]);
  function confirmDeleteuser() {
    deleteUser(formValues.user, {
      onSuccess: () => {
        refetchAllUsers()
        // setTempData(null)
        setFormValues({ type: 'create', user: null })
        setIsOpenDeleteUser(false)
      },

    })
    // setIsOpenDeleteUser(false)
  }
  return (
    <div className="flex flex-col h-full gap-4">
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
      <div className="flex-1">
        {/* <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2 md:grid-cols-3">
          {!isLoadingAllUsers &&
            allUsers.data.map((user) => <UserCard key={user.id} data={user} />)}

            
            </div> */}
        <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2 md:grid-cols-3">
          {/* {Array.from({ length: 5 }, (_, i) => <UserCardSkeleton key={i} />)} */}
          {!isLoadingAllUsers && !isFetchingAllUsers && allUsers?.data?.length > 0
            ? allUsers.data.map((user) => <UserCard key={user.id} data={user}
              onClickEdit={() => {
                // setTempData(user)
                setFormValues({ type: 'update', user })
                setIsOpenUpdateUser(true)
              }}
              onClickDelete={() => {
                // setTempData(user)
                setFormValues({ type: 'delete', user })
                setIsOpenDeleteUser(true)
              }}
            />)
            : Array.from({ length: PAGINATION.per_page }, (_, i) => <UserCardSkeleton key={i} />)}
        </div>

      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BaseInput
            hideLabel
            type="number"
            id="per_page"
            min={1}
            className="w-16 h-10 text-center"
            value={perPage}
            onChange={(e) => setPerPage(+e.target.value < 1 ? 1 : +e.target.value > allUsers.total ? allUsers.total : +e.target.value)}
          />
          <Label
            id="per_page"
            label="per page"
            palceholder="per page"
            className="text-lg"
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-custom_yellow">
          {
            page > 1 && (
              <IconButton onClick={() => setPage(val => val - 1)}>
                <DownIcon className="size-4 rotate-90" />
              </IconButton>
            )
          }
          {
            page < allUsers?.last_page && (
              <IconButton onClick={() => setPage(val => val + 1)}>
                <DownIcon className="size-4 -rotate-90" />
              </IconButton>
            )
          }

        </div>
      </div>
      <Dialog
        isOpen={isOpenCreateUser}
        title="add new user"
        className="max-w-lg "
      >
        <UserForm
          formValues={formValues}
          handelOnClickCancel={() => setIsOpenCreateUser(false)} />
      </Dialog>
      <Dialog
        isOpen={isOpenUpdateUser}
        title="update user"
        className="max-w-lg "
      >
        <UserForm
          formValues={formValues}
          handelOnClickCancel={() => {
            // setTempData(null)
            setFormValues({ type: 'create', user: null })
            setIsOpenUpdateUser(false)
          }}
        />
      </Dialog>
      <DialogConfirmDelete text={formValues?.user?.name}
        isOpen={isOpenDeleteUser}
        onClickClose={() => {
          // setTempData(null)
          setFormValues({ type: 'create', user: null })
          setIsOpenDeleteUser(false)
        }}
        onClickDelete={confirmDeleteuser}
        isLoading={isLoadingDeleteUser && !isErrorDeleteUser}
      />
    </div>
  );
}
