import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, registerSchema } from "./register.schema";
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation";

export const useRegisterViewModel = () => {
  const userRegisterMutation = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "Kartana",
      email: "kartana@mail.com",
      phone: "12345678910",
      password: "123123123",
      confirmPassword: "123123123",
    },
  });

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...rest } = userData;
    await userRegisterMutation.mutateAsync(rest);
  });

  return { control, onSubmit, errors };
};
