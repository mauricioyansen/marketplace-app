import { ImagePickerOptions } from "expo-image-picker";
import { useAppModal } from "./useAppModal";
import { useCam } from "./useCam";
import { useGallery } from "./useGallery";
import { useModalStore } from "../store/modal-store";

interface useImgParams extends ImagePickerOptions {
  callback: (uri: string | null) => void;
}

export const useImg = ({ callback, ...pickerOpt }: useImgParams) => {
  const modals = useAppModal();
  const { openCam, isLoading: camLoading } = useCam(pickerOpt);
  const { openGallery, isLoading: galleryLoading } = useGallery(pickerOpt);
  const loading = Boolean(camLoading || galleryLoading);
  const { close } = useModalStore();

  const handleCallback = (uri: string | null) => {
    close();
    callback(uri);
  };

  const handleSelectImg = () => {
    modals.showSelection({
      title: "Select image",
      message: "Choose an option: ",
      options: [
        {
          text: "Gallery",
          icon: "images",
          variant: "primary",
          onPress: async () => {
            const imgUri = await openGallery();
            handleCallback(imgUri);
          },
        },
        {
          text: "Cam",
          icon: "camera",
          variant: "primary",
          onPress: async () => {
            const imgUri = await openCam();
            handleCallback(imgUri);
          },
        },
      ],
    });
  };

  return { handleSelectImg, loading };
};
