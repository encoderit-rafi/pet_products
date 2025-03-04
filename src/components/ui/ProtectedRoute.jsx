import { useAuthUserQuery } from "@/api/auth/queries/useAuthUserQuery";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ permissions, children }) {
  console.log("🚀 ~ ProtectedRoute ~ ProtectedRoute:");
  // const navigate = useNavigate();
  // const { data: user } = useAuthUserQuery();
  const { user_permissions } = useAuth();
  // const [hasPermissions, setHasPermissions] = useState(null);

  // const userPermissions = user.user_roles.flatMap((role) =>
  //   role.permissions.map((p) => p.name)
  // );
  // console.log("🚀 ~ ProtectedRoute ~ userPermissions:", userPermissions);
  const hasPermissions = permissions?.some((item) =>
    user_permissions.includes(item)
  );
  console.log("🚀 ~ ProtectedRoute ~ hasPermissions:", hasPermissions);
  // const [userPermissions, setUserPermissions] = useState([]);
  // useEffect(() => {
  //   setUserPermissions(
  // user.user_roles.flatMap((role) => role.permissions.map((p) => p.name))
  //   );
  // }, [user]);
  // useEffect(() => {
  //   setHasPermissions(
  // permissions?.some((item) => userPermissions.includes(item))
  //   );
  // }, [userPermissions]);
  // useEffect(() => {
  //   console.log("🚀 ~ ProtectedRoute ~ hasPermissions:", hasPermissions);
  // }, [hasPermissions]);

  if (hasPermissions === false) {
    return <Navigate to={"/page-not-found"} />;
  }
  return children;
}
