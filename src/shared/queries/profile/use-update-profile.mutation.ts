import { useMutation } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { updateUserProfile } from "../../services/profile.service";
import { useUserStore } from "../../store/user-store";
import { useAppModal } from "../../hooks/useAppModal";

export const useUpdateProfileMutation = () => {
  const { updateUser } = useUserStore();
  const { showSuccess } = useAppModal();

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (response) => {
      updateUser({ ...response.user });
      showSuccess({
        title: "Profile Updated",
        message: "Your profile has been updated successfully.",
        buttonText: "Close",
        onButtonPress: () => {},
      });
    },
    onError: (error) => {
      Toast.error(
        error.message ?? "Failed to update profile. Please try again.",
      );
    },
  });

  return mutation;
};
