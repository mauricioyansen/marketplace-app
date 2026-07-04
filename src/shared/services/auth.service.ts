import {
  RegisterHttpRequest,
  RegisterHttpResponse,
} from "../interfaces/http/register";
import { marketplaceApi } from "../api/marketplace";

export const register = async (userData: RegisterHttpRequest) => {
  const { data } = await marketplaceApi.post<RegisterHttpResponse>(
    "/auth/register",
    userData,
  );

  return data;
};
