import { marketplaceApi } from "../api/marketplace";
import {
  UpdateProfileParams,
  UpdateProfileResponse,
} from "../interfaces/http/update-profile";

export const updateUserProfile = async (userData: UpdateProfileParams) => {
  const { data } = await marketplaceApi.put<UpdateProfileResponse>(
    "/user",
    userData,
  );

  return data;
};
