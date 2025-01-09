import React from 'react'
import Dialog from './Dialog'
import BaseButton from '../buttons/BaseButton'
import { NavLink } from 'react-router-dom'
import { useLogoutQuery } from '@/api/auth/queries/useLogoutQuery';

export default function DialogConfirmDelete({ text, isOpen, onClickClose, onClickDelete, isLoading }) {
 // const { refetch: logoutUser, isLoading: isLoadingLogOut } = useLogoutQuery();
 return (
  <Dialog
   title="confirm delete"
   isOpen={isOpen}
   className="max-w-96"
  >
   <div className="mt-4">
    <h5 className="mx-auto text-sm tracking-wide text-center max-w-72 font-extralight">
     {" "}
     Are you sure you want to delete {text} permanently?
    </h5>
    <div className="flex items-center gap-4 mt-5">
     <BaseButton
      className="text-sm font-medium"
      onClick={onClickClose}
      isDisabled={isLoading}
     >
      close
     </BaseButton>
     <BaseButton variant="gradient" className="text-sm font-medium"
      onClick={onClickDelete}
      isDisabled={isLoading}
      isLoading={isLoading}
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
