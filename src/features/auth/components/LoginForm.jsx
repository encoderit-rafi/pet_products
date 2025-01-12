
import React, { useState } from "react";

import ToggleLogo from "@/components/ui/ToggleLogo";
import InputWithIcon from "@/components/inputs/InputWithIcon";
import BrandHeading from "@/components/ui/BrandHeading";
import BaseButton from "@/components/buttons/BaseButton";

import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
// import { useLoginMutation } from "./api/mutations/useLoginMutation";
// import { useAuthUserQuery } from "../api/queries/useAuthUserQuery";
import MailIcon from "@/assets/icons/MailIcon";
import PasswordIcon from "@/assets/icons/PasswordIcon";
import { useAuthUserQuery } from "@/api/auth/queries/useAuthUserQuery";
import { validationRules } from "@/consts";
import { useLoginMutation } from "../login/api/mutations/useLoginMutation";

export default function LoginForm() {
 const navigate = useNavigate();
 const { user, setToken, setUser } = useAuth();
 const { mutate: loginUser, isLoading } = useLoginMutation();
 const { refetch: authUser, isLoading: isLoadingAuthUser } =
  useAuthUserQuery();
 const { register, formState, handleSubmit } = useForm();
 const { errors } = formState;
 function onSubmit(data) {
  loginUser(data, {
   onSuccess: async (res) => {
    await handelCheckAuthUser();
    // toast.success(res.data.message);
    navigate("/");
   },
  });
 }
 async function handelCheckAuthUser() {
  await authUser();
  await setToken(localStorage.getItem("token"));
  await setUser(JSON.parse(localStorage.getItem("user")));
 }
 if (user) return <Navigate replace to="/" />;
 return (
  <form onSubmit={handleSubmit(onSubmit)}
   className="w-full px-5"
  >
   <div className="px-3 space-y-3 text-sm font-light lg:space-y-2 font-poppins animate-fade lg:px-0">
    <InputWithIcon
     autoFocus
     id="email"
     type="email"
     palceholder="email address"
     className={errors?.email ? "border-b-red-500" : ""}
     register={register("email", validationRules.email)}
     icon={
      <MailIcon className="absolute -translate-y-1/2 top-1/2 size-5" />
     }
    />
    <div className="relative ">
     <InputWithIcon
      id="password"
      type="password"
      palceholder="password"
      className={errors?.password ? "border-b-red-500" : ""}
      register={register("password", validationRules.password)}
      icon={
       <PasswordIcon className="absolute -translate-y-1/2 top-1/2 size-5" />
      }
     />
     <div className="absolute right-0 -translate-y-1/2 text-custom_text_two top-1/2">
      <span>Forgot</span>
     </div>
    </div>
   </div>
   <div className="w-full px-3 mt-20 lg:px-0 lg:mt-24 animate-fade-up">
    <BaseButton
     type="submit"
     isLoading={isLoading}
     isDisabled={isLoading}
     variant="gradient"
     className="font-medium"
    >
     login
    </BaseButton>
   </div>
  </form>
 )
}
