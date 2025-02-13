import React from 'react'
import Dialog from './Dialog'
import BaseButton from '../buttons/BaseButton'
import { NavLink } from 'react-router-dom'
import { useLogoutQuery } from '@/api/auth/queries/useLogoutQuery';

export default function DialogLogout({ isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog }) {
 const { refetch: logoutUser, isLoading: isLoadingLogOut } = useLogoutQuery();
 return (
  <Dialog
   title="log out"
   isOpen={isOpenConfirmLogoutDialog}
   className="max-w-96"
  >
   <div className="mt-4">
    <h5 className="mx-auto text-sm tracking-wide text-center max-w-72 font-extralight">
     {" "}
     Are you sure you want to logout from your account?
    </h5>
    <div className="flex items-center gap-4 mt-5">
     <BaseButton
      className="text-sm font-medium"
      isDisabled={isLoadingLogOut}
      onClick={() => setIsOpenConfirmLogoutDialog(false)}
     >
      close
     </BaseButton>
     <BaseButton variant="gradient" className="text-sm font-medium"
      isLoading={isLoadingLogOut}
      isDisabled={isLoadingLogOut}
      onClick={logoutUser}
     >
      {/* <NavLink to="/login"> */}
      confirm
      {/* </NavLink> */}
     </BaseButton>
    </div>
   </div>
  </Dialog>
 )
}
