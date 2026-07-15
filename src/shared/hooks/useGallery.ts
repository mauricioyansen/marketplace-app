import * as ImagePicker from "expo-image-picker";
import { ImagePickerOptions } from "expo-image-picker";
import { useCallback, useState } from "react";
import { Toast } from "toastify-react-native";

export const useGallery = (pickerOpt: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestGalleryPermission = useCallback(async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const currentStatus = status === "granted";

      if (!currentStatus) {
        Toast.error("This app needs permission to access your gallery", "top");
      }

      return currentStatus;
    } catch {
      Toast.error("Error requesting gallery permission", "top");
      return false;
    }
  }, []);

  const openGallery = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync(pickerOpt);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success("Photo captured successfully", "top");
        return result.assets[0].uri;
      }

      return null;
    } catch {
      Toast.error("Error selecting the photo", "top");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { openGallery, isLoading };
};
