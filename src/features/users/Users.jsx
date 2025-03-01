import { useEffect, useMemo, useState } from "react";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import UserForm from "./components/userForm";
import UserCard from "./components/UserCard";
import UserCardSkeleton from "./components/UserCardSkeleton";

import { PAGINATION } from "@/consts";
import DialogConfirmDelete from "@/components/dialogs/DialogConfirmDelete";
import Pagination from "@/components/pagination";
import { Axios } from "@/axios";
import { useCallback } from "react";
import Page from "@/components/ui/Page";
import { useGetAllUsers } from "@/api/users/useGetAllUsers";
import { useSearchParams } from "react-router-dom";
import BaseTabList from "@/components/tabs/BaseTabList";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import RoleForm from "./components/RoleForm";
import { useGetAllRoles } from "@/api/roles/useGetAllRoles";
import Table from "@/components/tables/Table";
import RoleCardSkeleton from "./components/RoleCardSkeleton";
import RoleCard from "./components/RoleCard";
import { useDeleteRole } from "@/api/roles/useDeleteRole";
const tabs = [
  {
    id: 0,
    name: "Users",
    value: "users",
  },
  {
    id: 1,
    name: "Roles",
    value: "roles",
  },
];
export default function Users() {
  const {
    data: allUsers,
    refetch: fetchAllUsers,
    isLoading: isLoadingAllUsers,
    isFetching: isFetchingAllUsers,
    params: paramsAllUsers,
    setParams: setParamsAllUsers,
  } = useGetAllUsers({ setToUrl: true, isEnabled: true });
  const {
    data: allRoles,
    refetch: fetchAllRoles,
    isLoading: isLoadingAllRoles,
    isFetching: isFetchingAllRoles,
    params: paramsAllRoles,
    setParams: setParamsAllRoles,
  } = useGetAllRoles();
  const { mutate: deleteRole, isLoading: isLoadingDeleteRole } =
    useDeleteRole();
  useEffect(() => {
    console.log("🚀 ~ Users ~ allRoles:", allRoles);
  }, [allRoles]);
  const [isOpenRole, setIsOpenRole] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false);
  const [isLoadingDeleteUser, setIsLoadingDeleteUser] = useState(false);
  const [isOpenDeleteRole, setIsOpenDeleteRole] = useState(false);
  // const [isLoadingDeleteRole, setIsLoadingDeleteRole] = useState(false);
  const [userFormValues, setUserFormValues] = useState({
    type: "create",
    user: null,
  });
  const [roleFormValues, setRoleFormValues] = useState({
    type: "create",
    role: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get("type") == null
      ? tabs[0]
      : tabs.find((tab) => tab.value == searchParams.get("type"))
  );
  useEffect(() => {
    setActiveTabIndex(activeTab.id);
  }, [activeTab]);
  useEffect(() => {
    setActiveTab(
      searchParams.get("type") == null
        ? tabs[0]
        : tabs.find((tab) => tab.value == searchParams.get("type"))
    );
  }, [searchParams.get("type")]);
  function handelOpenModal() {
    switch (activeTabIndex) {
      case 0:
        setIsOpenUser(true);
        return;
      case 1:
        setIsOpenRole(true);
        return;
      default:
        return;
    }
  }
  async function confirmDeleteUser() {
    setIsLoadingDeleteUser(true);
    const res = await Axios.get(`/users/delete/${userFormValues?.user?.id}`);
    if (res.status === 200) {
      console.log("🚀 ~ confirmDeleteUser ~ res.status:", res.status);
      setParamsAllUsers(paramsAllUsers);
      fetchAllUsers();
      setUserFormValues({ type: "create", user: null });
      setIsOpenDeleteUser(false);
    }
    setIsLoadingDeleteUser(false);
  }
  async function confirmDeleteRole() {
    deleteRole(roleFormValues.role, {
      onSuccess() {
        fetchAllRoles();
        setUserFormValues({ type: "create", role: null });
        setIsOpenDeleteRole(false);
      },
    });
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
    <TabGroup
      selectedIndex={activeTabIndex}
      onChange={setActiveTabIndex}
      className={"h-full"}
    >
      <Page
        // title="Assigned Users"
        title={`Assigned ${activeTab.name}`}
        actions={
          <div className="flex flex-row items-center flex-1 gap-4">
            <BaseTabList
              list={tabs}
              activeTab={activeTab}
              className={{ tabList: "ml-auto" }}
              handelOnChangeTab={(item) => {
                setSearchParams({ type: item.value });
              }}
            />
            <BaseButton
              variant="orange"
              icon="plus"
              className="px-3 text-xs max-w-fit lg:px-5"
              onClick={handelOpenModal}
            >
              <span className="hidden lg:block">add new</span>
            </BaseButton>
          </div>
        }
      >
        <div className="flex flex-col flex-1">
          <TabPanels className="flex flex-col flex-1">
            <TabPanel className={"flex flex-col flex-1"}>
              <div className="grid grid-cols-1 gap-6 pr-2 mt-2 md:grid-cols-2 xl:grid-cols-3">
                {isLoadingAllUsers || isFetchingAllUsers ? (
                  Array.from({ length: 5 }, (_, i) => (
                    <UserCardSkeleton key={i} />
                  ))
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
            </TabPanel>
            <TabPanel className={"flex flex-col flex-1"}>
              <div className="grid grid-cols-1 gap-6 pr-2 mt-2 md:grid-cols-2 xl:grid-cols-3">
                {isLoadingAllRoles || isFetchingAllRoles ? (
                  Array.from({ length: 5 }, (_, i) => (
                    <RoleCardSkeleton key={i} />
                  ))
                ) : allRoles?.data?.length > 0 ? (
                  allRoles.data.map((role) => (
                    <RoleCard
                      key={role.id}
                      data={role}
                      onCLickView={() => {
                        console.log("🚀 ~ Users ~ onCLickView:");
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
              </div>
            </TabPanel>
          </TabPanels>
        </div>

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
      </Page>
    </TabGroup>
  );
}
