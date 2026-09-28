import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "../../services/auth.service";
import { Toast } from "toastify-react-native";
import { useUserStore } from "../../store/user-store";

export const useUploadAvatarMutation = () => {
  const { updateUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (res) => {
      updateUser({ avatarUrl: res.url });
    },
    onError: (err) => {
      console.log(err);
      Toast.error("Error uploading profile pic", "top");
    },
  });

  return mutation;
};
