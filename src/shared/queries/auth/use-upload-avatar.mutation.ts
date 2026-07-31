import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "../../services/auth.service";
import { Toast } from "toastify-react-native";

export const useUploadAvatarMutation = () => {
  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (res) => {
      console.log("AVATAR", res);
    },
    onError: (err) => {
      console.log(err);
      Toast.error("Error uploading profile pic", "top");
    },
  });

  return mutation;
};
