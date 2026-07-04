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
      // Handle successful registration
    },
    onError: (error: any) => {
      console.log(error);
      // Handle registration error
    },
  });

  return mutation;
};
