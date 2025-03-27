import { IApiBaseAuthLogin } from '@interfaces/auth/login';
import { api, support } from '@apis/support';
import { IApiBaseResponse } from '@interfaces/api';
import { IApiBaseAuthRefreshToken } from '@interfaces/auth';

const auth = () => {
  const { apiUrl } = support();

  const url = {
    login: apiUrl.auth.login,
    register: apiUrl.auth.register,
    refreshToken: apiUrl.auth.refreshToken,
    logout: apiUrl.auth.logout,
  }

  const login = async (
    email: string, 
    password: string
  ) => {
    const response = await api.post<IApiBaseResponse<IApiBaseAuthLogin>>(
      url.login, 
      {
        email,
        password
      }
    );

    return response.data;
  }

  const register = async (
    username: string,
    email: string,
    password: string,
    confirm_password: string
  ) => {
    const response = await api.post<IApiBaseResponse<undefined>>(
      url.register, {
        username,
        email,
        password,
        confirm_password
      }
    );
    
    return response.data;
  }

  const refreshToken = async () => {
    const res = await api.post<IApiBaseResponse<IApiBaseAuthRefreshToken>>(
      url.refreshToken
    );

    return res.data;
  }

  const logout = async () => {
    const res = await api.post<IApiBaseResponse<undefined>>(
      url.logout
    )

    return res.data;
  }

  return {
    login,
    register,
    refreshToken,
    logout
  }
}

export default auth;