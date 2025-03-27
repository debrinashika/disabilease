import { IApiBaseResponse } from "@interfaces/api";
import { IApiBaseUserSelf } from "@interfaces/user";
import { IApiBaseAuthLogin } from "./login";

export type IApiBaseAuthContext = {
  user: IApiBaseUserSelf | null;

  login: (
    email: string, 
    password: string
  ) => Promise<IApiBaseResponse<IApiBaseAuthLogin>>;

  register: (
    username: string,
    email: string,
    password: string,
    confirm_password: string
  ) => Promise<IApiBaseResponse<undefined>>;

  logout: () => Promise<IApiBaseResponse<undefined>>;

  self: () => Promise<IApiBaseResponse<IApiBaseUserSelf>>;
}

export type IApiBaseAuthRefreshToken = {
  token: string
}