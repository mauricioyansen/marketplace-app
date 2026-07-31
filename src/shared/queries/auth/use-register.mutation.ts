import { useMutation } from "@tanstack/react-query";
import { RegisterHttpRequest } from "../../interfaces/http/register";
import { register } from "../../services/auth.service";
import { AuthHttpResponse } from "../../interfaces/http/auth-response";
import { useUserStore } from "../../store/user-store";

interface UserRegisterMutationParams {
  onSuccess?: () => void;
}

export const useRegisterMutation = ({
  onSuccess,
}: UserRegisterMutationParams = {}) => {
  const { setSession } = useUserStore();

  const mutation = useMutation({
    mutationFn: (userData: RegisterHttpRequest) => register(userData),
    onSuccess: (res: AuthHttpResponse) => {
      setSession({
        user: res.user,
        token: res.token,
        refreshToken: res.refreshToken,
      });
      // console.log("Register response:", res);
      // console.log("Access token:", res.token);
      // console.log("Refresh token:", res.refreshToken);
      // console.log("User:", res.user);
      onSuccess?.();
    },
    onError: (error: any) => {
      console.log("Register error:", error);
      // Handle registration error
    },
  });

  return mutation;
};
