import { ImagePickerOptions } from "expo-image-picker";
import { useAppModal } from "./useAppModal";
import { useCam } from "./useCam";
import { useGallery } from "./useGallery";

export const useImg = (pickerOpt: ImagePickerOptions = {}) => {
  const modals = useAppModal();
  const { openCam, isLoading: camLoading } = useCam(pickerOpt);
  const { openGallery, isLoading: galleryLoading } = useGallery(pickerOpt);
  const loading = Boolean(camLoading || galleryLoading);

  const handleSelectImg = () => {
    modals.showSelection({
      title: "Select image",
      message: "Choose an option: ",
      options: [
        {
          text: "Gallery",
          icon: "images",
          variant: "primary",
          onPress: openGallery,
        },
        {
          text: "Cam",
          icon: "camera",
          variant: "primary",
          onPress: openCam,
        },
      ],
    });
  };

  return { handleSelectImg, loading };
};
