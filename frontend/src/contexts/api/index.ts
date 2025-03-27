import { IApiBaseApiContext } from "@interfaces/api";
import { createContext, useContext } from "react";

const context = createContext<IApiBaseApiContext>({
  token: null,

  setToken: () => {
    return undefined;
  }
});

export default context;

export const useApi = () => {
  return useContext(context);
}