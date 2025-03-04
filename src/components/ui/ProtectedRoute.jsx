import { useAuthUserQuery } from "@/api/auth/queries/useAuthUserQuery";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ permissions, children }) {
  console.log("🚀 ~ ProtectedRoute ~ ProtectedRoute:");
  // const navigate = useNavigate();
  const { refetch: fetchAuthUser } = useAuthUserQuery();
  const { user_permissions } = useAuth();
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ fetchAuthUser");
    fetchAuthUser();
  }, []);

  const hasPermissions = permissions?.some((item) =>
    user_permissions.includes(item)
  );
  console.log("🚀 ~ ProtectedRoute ~ hasPermissions:", hasPermissions);
  if (hasPermissions === false) {
    return <Navigate to={"/page-not-found"} />;
  }
  return children;
}
