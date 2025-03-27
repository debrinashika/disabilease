import { api, url as appUrl } from "@apis/support";
import { APIContext } from "@contexts";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { IApiBaseResponse } from "@interfaces/api";
import { IApiBaseAuthRefreshToken } from "@interfaces/auth";
import dayjs from "dayjs";
import axios from "axios";

interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  api.interceptors.request.use(
    async (config) => {
      const { url } = config;
      if (url === "/register" || url === "/login") {
        return config;
      }

      const accessToken = api.defaults.headers.common["Authorization"]?.toString();

      if (!accessToken) {
        const res = await axios.post<IApiBaseResponse<IApiBaseAuthRefreshToken>>(
          `${appUrl}/refresh-token`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.status === "success") {
          config.headers.Authorization = `Bearer ${res.data.data.token}`;
          setToken(res.data.data.token);
        }

        return config;
      }

      const decoded = jwtDecode<JwtPayload>(accessToken);

      const expirationTime = decoded.exp ? dayjs.unix(decoded.exp) : undefined;
      const isExpired = expirationTime
        ? expirationTime.diff(dayjs(), "second") <= 1
        : true;

      if (!isExpired) return config;

      // Expired token
      while (isExpired) {
        const res = await axios.post<IApiBaseResponse<IApiBaseAuthRefreshToken>>(
          `${appUrl}/refresh-token`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.status === "success") {
          config.headers.Authorization = `Bearer ${res.data.data.token}`;
          setToken(res.data.data.token);
          break; // Exit the loop if token refresh is successful
        } else {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const setToken = (token: string | null) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  return (
    <APIContext.Provider
      value={{
        token: api.defaults.headers.common["Authorization"]?.toString() || null,
        setToken,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};