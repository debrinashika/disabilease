import React, { useEffect, useState } from "react";
import { AuthContext, useApi } from "@contexts";
import { IApiBaseUserSelf } from "@interfaces/user";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/shares/Layouts";
import { apiBase } from "@apis";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { setToken } = useApi();

  const [user, setUser] = useState<IApiBaseUserSelf | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const self = async () => {
    const res = await apiBase().user().self();

    if (res.status === "success") {
      setUser(res.data);
    }

    return res;
  };

  const login = async (email: string, password: string) => {
    const res = await apiBase().auth().login(email, password);

    if (res.status === "success") {
      // Set token to header
      setToken(res.data.token);
      setUser(res.data.user);

      if (res.data.user.already_test) {
        navigate("/");
      } else {
        navigate("/assessment");
      }
    }

    return res;
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    confirm_password: string
  ) => {
    navigate("/login");

    return apiBase().auth().register(username, email, password, confirm_password);


  };

  const logout = async () => {
    const res = await apiBase().auth().logout();

    if (res.status === "success") {
      setToken(null);
      setUser(null);
      navigate("/login");
    }

    return res;
  };

  useEffect(() => {
    setIsLoading(true);
  
    const delay = setTimeout(async () => {
      try {
        const res = await self();
        if (res.status !== "success") {
          console.log("User not logged in, staying on current page");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    });
  
    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        self
      }}
    >
      {isLoading ? <div className="h-screen"></div> : children}
      <Loading isLoading={isLoading} /> 
    </AuthContext.Provider>
  );
};
