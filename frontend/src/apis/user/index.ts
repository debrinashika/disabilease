import { IApiBaseUserSelf } from "@interfaces/user"
import { api, support } from "@apis/support";
import { IApiBaseResponse } from "@interfaces/api";

const auth = () => {
  const { apiUrl } = support();

  const url = {
    self: apiUrl.user.self
  }

  const self = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseUserSelf>>(
      url.self
    );

    return response.data;
  }

  return {
    self
  }
}

export default auth;