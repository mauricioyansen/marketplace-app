import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, registerSchema } from "./register.schema";
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation";
import { useUserStore } from "../../shared/store/user-store";
import { useImg } from "../../shared/hooks/useImg";

export const useRegisterViewModel = () => {
  const userRegisterMutation = useRegisterMutation();
  const { setSession, user } = useUserStore();
  const { handleSelectImg } = useImg();

  const handleSelectAvatar = async () => {
    await handleSelectImg();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...rest } = userData;
    const mutationRes = await userRegisterMutation.mutateAsync(rest);
    setSession({
      user: mutationRes.user,
      token: mutationRes.token,
      refreshToken: mutationRes.refreshToken,
    });
  });

  console.log(user);

  return { control, onSubmit, errors, handleSelectAvatar };
};
