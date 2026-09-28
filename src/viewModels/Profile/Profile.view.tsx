import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { AppButton } from "../../shared/components/AppButton";
import { AppInputController } from "../../shared/components/AppInputController";
import { KeyboardContainer } from "../../shared/components/KeyboardContainer";
import { normalizeImageUrl } from "../../shared/utils/normalizeImageUrl";
import { Header } from "./components/Header";
import { useProfileViewModel } from "./useProfile.viewModel";

export const ProfileView: FC<ReturnType<typeof useProfileViewModel>> = ({
  control,
  onSubmit,
  avatarUri,
  isSubmitting,
  handleLogout,
  handleSelectImg,
  loading,
}) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <Header handleLogout={handleLogout} />
        <TouchableOpacity
          onPress={handleSelectImg}
          className="w-[120px] h-[120px] rounded-xl items-center justify-center bg-shape self-center mb-8 mt-6"
        >
          {avatarUri ? (
            <Image
              source={normalizeImageUrl(avatarUri)}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} />
          )}
        </TouchableOpacity>
        <Text className="text-base mt-6 font-bold text-gray-500">
          Personal Information
        </Text>

        <AppInputController
          leftIcon="person-outline"
          label="NAME"
          control={control}
          name="name"
          placeholder="Your full name"
        />

        <AppInputController
          leftIcon="call-outline"
          label="PHONE"
          control={control}
          name="phone"
          placeholder="(00) 00000-0000"
        />

        <Text className="text-base mt-6 font-bold text-gray-500">Access</Text>

        <AppInputController
          leftIcon="mail-outline"
          label="E-MAIL"
          control={control}
          name="email"
          placeholder="mail@example.com.br"
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          label="PASSWORD"
          control={control}
          name="password"
          placeholder="Your password"
          secureTextEntry
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          label="NEW PASSWORD"
          control={control}
          name="newPassword"
          placeholder="Enter your new password"
          secureTextEntry
        />

        <AppButton className="my-6" onPress={onSubmit} isLoading={isSubmitting}>
          Update Profile
        </AppButton>
      </ScrollView>
    </KeyboardContainer>
  );
};
