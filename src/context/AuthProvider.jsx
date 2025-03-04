import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const user_permissions = user.user_roles.flatMap((role) =>
    role.permissions.map((p) => p.name)
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
