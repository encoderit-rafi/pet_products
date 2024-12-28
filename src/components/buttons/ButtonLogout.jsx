import LogoutIcon from '@/assets/icons/LogoutIcon';
import React, { useState } from 'react'
import Dialog from '../dialogs/Dialog';
import BaseButton from './BaseButton';
import { NavLink } from 'react-router-dom';

export default function ButtonLogout({ ...props }) {
 // const [isOpenConfirmLogoutDialog, setIsOpenConfirmLogoutDialog] =
 //  useState(false);
 return (
  <>
   <button
    // onClick={() => setIsOpenConfirmLogoutDialog(true)}
    {...props}
    className="text-xs font-light transition-all duration-500 text-custom_text_six hover:text-red-500"
   >
    <div className="flex flex-col items-center gap-2 text-center capitalize">
     <LogoutIcon className="w-4" />

     <p>log out</p>
    </div>
   </button>
   {/* <Dialog
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
       onClick={() => setIsOpenConfirmLogoutDialog(false)}
      >
       close
      </BaseButton>
      <BaseButton variant="gradient" className="text-sm font-medium">
       <NavLink to="/login">confirm</NavLink>
      </BaseButton>
     </div>
    </div>
   </Dialog> */}
  </>
 )
}
