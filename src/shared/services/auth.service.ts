import { RegisterHttpRequest } from "../interfaces/http/register";
import { marketplaceApi } from "../api/marketplace";
import { AuthHttpResponse } from "../interfaces/http/auth-response";
import { LoginHttpRequest } from "../interfaces/http/login";

export const register = async (userData: RegisterHttpRequest) => {
  const { data } = await marketplaceApi.post<AuthHttpResponse>(
    "/auth/register",
    userData,
  );

  return data;
};

export const login = async (userData: LoginHttpRequest) => {
  const { data } = await marketplaceApi.post<AuthHttpResponse>(
    "/auth/login",
    userData,
  );

  return data;
};
