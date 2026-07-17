import { RegisterHttpRequest } from "../interfaces/http/register";
import { marketplaceApi } from "../api/marketplace";
import { AuthHttpResponse } from "../interfaces/http/auth-response";
import { LoginHttpRequest } from "../interfaces/http/login";
import { UploadAvatarRes } from "../interfaces/http/upload-avatar";
import { BASE_URL } from "../../shared/api/marketplace";

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

export const uploadAvatar = async (avatarUri: string) => {
  const formData = new FormData();

  formData.append("avatar", {
    uri: avatarUri,
    type: "image/jpeg",
    name: "avatar.jpeg",
  } as unknown as Blob);

  const { data } = await marketplaceApi.post<UploadAvatarRes>(
    "/user/avatar",
    formData,
  );

  data.url = `${BASE_URL}${data.url}`;

  return data;
};
