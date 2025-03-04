import { createContext, useContext, useMemo, useState } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const user_permissions = useMemo(() =>
    user?.user_roles?.length > 0
      ? user?.user_roles.flatMap(
          (role) =>
            role?.permissions?.length > 0
              ? role?.permissions.map((p) => p.name)
              : [],
          [user]
        )
      : []
  );
  return (
    <AuthContext.Provider
      value={{ token, user, setToken, setUser, user_permissions }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
