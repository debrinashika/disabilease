export interface IApiBaseApiContext {
  token: string | null;
  setToken: (token: string | null) => void;
}

export interface IApiBaseResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export interface IApiBaseResponseError<T> {
  status: "error"
  message: string
  errors?: T
}

export interface IApiError {
  set: (error: unknown) => void;
  getErrors: (key?: string | undefined) => string[] | (IApiBaseError & unknown[]) | undefined;
  getMessage: () => string | undefined;
  clear: () => void;
}

export interface IApiBaseError {
  [key: string]: string[];
}