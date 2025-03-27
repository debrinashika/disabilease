
import { IApiBaseResponse } from "@interfaces/api";
import { IApiBaseAuthContext } from "@interfaces/auth";
import { IApiBaseAuthLogin } from "@interfaces/auth/login";
import { IApiBaseUserSelf } from "@interfaces/user";
import { createContext, useContext } from "react";

const context = createContext<IApiBaseAuthContext>({
  user: null,

  login: async () => {
    const loginResponse: IApiBaseResponse<IApiBaseAuthLogin> = {
      data: {
        user: {
          user_id: -1,
          username: "",
          email: "",
          already_test: false
        },
        token: ""
      },
      status: "success",
      message: 'Login successful',
    };

    return Promise.resolve(loginResponse);
  },

  register: async () => {
    const registerResponse: IApiBaseResponse<undefined> = {
      data: undefined,
      status: "success",
      message: 'Register successful',
    };

    return Promise.resolve(registerResponse);
  },

  logout: async () => {
    const logoutResponse: IApiBaseResponse<undefined> = {
      data: undefined,
      status: "success",
      message: 'Logout successful',
    };

    return Promise.resolve(logoutResponse);
  },

  self: async () => {
    const selfResponse: IApiBaseResponse<IApiBaseUserSelf> = {
      data: {
        user_id: -1,
        username: "",
        email: "",
        already_test: false
      },
      status: "success",
      message: 'Operation successful',
    };

    return Promise.resolve(selfResponse);
  }
});

export default context;

export const useAuth = () => {
  return useContext(context);
}