import { useMutation } from "@tanstack/react-query";
import { LoginHttpRequest } from "../../interfaces/http/login";
import { login } from "../../services/auth.service";
import { AuthHttpResponse } from "../../interfaces/http/auth-response";

export const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: (userData: LoginHttpRequest) => login(userData),
    onSuccess: (res: AuthHttpResponse) => {
      console.log("Login response:", res);
      console.log("Access token:", res.token);
      console.log("Refresh token:", res.refreshToken);
      console.log("User:", res.user);
    },
    onError: (error: any) => {
      console.log("Login error:", error);
      // Handle registration error
    },
  });

  return mutation;
};
