import { useState, useEffect } from "react";
import axios from "../api/axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ email, roles: payload["role"], token });
  };

  const register = async (email, password, fullName) => {
    await axios.post("/auth/register", { email, password, fullName });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // асинхронный вызов setUser, чтобы избежать предупреждения
      Promise.resolve().then(() => {
        setUser({ email: payload["email"], roles: payload["role"], token });
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

