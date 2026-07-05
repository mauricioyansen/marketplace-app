import { useMutation } from "@tanstack/react-query";
import {
  RegisterHttpResponse,
  RegisterHttpRequest,
} from "../../interfaces/http/register";
import { register } from "../../services/auth.service";

export const useRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: (userData: RegisterHttpRequest) => register(userData),
    onSuccess: (res: RegisterHttpResponse) => {
      console.log("Register response:", res);
      console.log("Access token:", res.token);
      console.log("Refresh token:", res.refreshToken);
      console.log("User:", res.user);
    },
    onError: (error: any) => {
      console.log("Register error:", error);
      // Handle registration error
    },
  });

  return mutation;
};
