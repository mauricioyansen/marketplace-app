import { useMutation } from "@tanstack/react-query";
import { LoginHttpRequest } from "../../interfaces/http/login";
import { login } from "../../services/auth.service";
import { AuthHttpResponse } from "../../interfaces/http/auth-response";
import { useUserStore } from "../../store/user-store";
import { Alert } from "react-native";

const getErrorMessage = (error: any) => {
  const message = error?.message || error?.response?.data?.message;

  if (message) {
    return message;
  }

  if (error?.originalError?.message) {
    return error.originalError.message;
  }

  return "Não foi possível realizar o login. Tente novamente.";
};

export const useLoginMutation = () => {
  const { setSession } = useUserStore();

  const mutation = useMutation({
    mutationFn: (userData: LoginHttpRequest) => login(userData),
    onSuccess: (res: AuthHttpResponse) => {
      setSession(res);
      // console.log("Login response:", res);
      // console.log("Access token:", res.token);
      // console.log("Refresh token:", res.refreshToken);
      // console.log("User:", res.user);
    },
    onError: (error: any) => {
      // console.log("Login error:", error);
      Alert.alert("Erro ao entrar", getErrorMessage(error));
    },
  });

  return mutation;
};
