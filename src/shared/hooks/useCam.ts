import * as ImgPicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Toast } from "toastify-react-native";
import { ImagePickerOptions } from "expo-image-picker";

export const useCam = (pickerOpt: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const reqCamPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ImgPicker.requestCameraPermissionsAsync();
      const currentStatus = status === "granted";

      if (!currentStatus) {
        Toast.error("This app needs permission to access the camera", "top");
      }

      return currentStatus;
    } catch (error) {
      Toast.error("Error requesting camera permission", "top");
      return false;
    }
  }, []);

  const openCam = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const hasPermission = await reqCamPermission();

      if (!hasPermission) return null;

      const result = await ImgPicker.launchCameraAsync(pickerOpt);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success("Photo captured successfully", "top");
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      Toast.error("Error opening the camera", "top");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { reqCamPermission, isLoading, openCam };
};
