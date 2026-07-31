import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, registerSchema } from "./register.schema";
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation";
import { useUserStore } from "../../shared/store/user-store";
import { useImg } from "../../shared/hooks/useImg";
import { useState } from "react";
import { CameraType } from "expo-image-picker";
import { useUploadAvatarMutation } from "../../shared/queries/auth/use-upload-avatar.mutation";

export const useRegisterViewModel = () => {
  const { updateUser } = useUserStore();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const { handleSelectImg } = useImg({
    callback: setAvatarUri,
    cameraType: CameraType.front,
  });

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

  const uploadAvatarMutation = useUploadAvatarMutation();

  const userRegisterMutation = useRegisterMutation({
    onSuccess: async () => {
      if (avatarUri) {
        const { url } = await uploadAvatarMutation.mutateAsync(avatarUri);
        updateUser({ avatarUrl: url });
      }
    },
  });

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...rest } = userData;
    await userRegisterMutation.mutateAsync(rest);
  });

  return { control, onSubmit, errors, handleSelectAvatar, avatarUri };
};
