import { useAuthUserQuery } from "@/api/auth/queries/useAuthUserQuery";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  console.log("🚀 ~ ProtectedRoute ~ user:", user);
  // const { data: user } = useAuthUserQuery();
  // useEffect(() => {
  // }, [user]);
  // if (!user) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
}
