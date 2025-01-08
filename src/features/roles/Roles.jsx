import { useState } from "react";
import Title from "@/components/texts/Title";
import BaseButton from "@/components/buttons/BaseButton";
import Dialog from "@/components/dialogs/Dialog";
import UserForm from "./components/userForm";
import UserCard from "./components/UserCard";
import UserCardSkeleton from "./components/UserCardSkeleton";
import { useGetAllUsers } from "./api/queries/useGetAllUsers";

export default function Roles() {
  const { data: allUsers, isLoading: isLoadingAllUsers } = useGetAllUsers();
  console.log("✅ ~ file: Roles.jsx:12 ~ Roles ~ allUsers:", allUsers);
  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false);
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
      <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2 md:grid-cols-3">
        {!isLoadingAllUsers &&
          allUsers.map((user) => <UserCard key={user.id} data={user} />)}

        {isLoadingAllUsers &&
          Array.from({ length: 5 }, (_, i) => <UserCardSkeleton key={i} />)}
      </div>
      <Dialog
        isOpen={isOpenCreateUser}
        title="add new user"
        className="max-w-lg "
      >
        <UserForm handelOnClickCancel={() => setIsOpenCreateUser(false)} />
      </Dialog>
    </div>
  );
}
