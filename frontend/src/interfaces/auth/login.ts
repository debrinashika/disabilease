import { IApiBaseUserSelf } from "@interfaces/user"

export interface IApiBaseLoginForm {
  email: string
  password: string
}

export interface IApiBaseAuthLogin {
  user: IApiBaseUserSelf
  token: string
}
