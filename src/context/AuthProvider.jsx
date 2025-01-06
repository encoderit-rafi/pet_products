import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
 const [token, setToken] = useState(() => localStorage.getItem("token"));
 const [user, setUser] = useState(() =>
  JSON.parse(localStorage.getItem("user"))
 );
 console.log("🟥 ~ AuthProvider ~ user:", user);

 return (
  <AuthContext.Provider value={{ token, user, setToken, setUser }}>
   {children}
  </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);
