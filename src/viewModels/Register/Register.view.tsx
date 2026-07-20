import { Text, TouchableOpacity, ScrollView, View, Image } from "react-native";
import { useRegisterViewModel } from "./userRegister.viewModel";
import { FC } from "react";
import { AppInputController } from "../../shared/components/AppInputController";
import { AuthFormHeader } from "../../shared/components/AuthFormHeader";
import { router } from "expo-router";
import { KeyboardContainer } from "../../shared/components/KeyboardContainer";
import { AppButton } from "../../shared/components/AppButton";
import { Ionicons } from "@expo/vector-icons";

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({
  onSubmit,
  control,
  handleSelectAvatar,
  avatarUri,
}) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-10">
        <AuthFormHeader
          title="Create your account"
          subtitle="Fill in the details to get started"
        />

        <TouchableOpacity
          className="w-[120px] h-[120px] rounded-xl items-center justify-center bg-shape self-center mb-8"
          onPress={handleSelectAvatar}
        >
          {avatarUri ? (
            <Image
              className="size-full rounded-xl"
              source={{ uri: avatarUri }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="cloud-upload-outline" size={32} />
          )}
        </TouchableOpacity>

        <AppInputController
          leftIcon="person-outline"
          label="NAME"
          control={control}
          name="name"
          placeholder="Your name"
        />

        <AppInputController
          leftIcon="call-outline"
          label="PHONE"
          control={control}
          name="phone"
          placeholder="(00) 0 0000-0000"
        />

        <Text className="text-base mt-6 font-bold text-gray-500">Access</Text>

        <AppInputController
          leftIcon="mail-outline"
          label="EMAIL"
          control={control}
          name="email"
          placeholder="mail@example.com"
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          label="PASSWORD"
          control={control}
          name="password"
          secureTextEntry
          placeholder="Your password"
        />

        <AppInputController
          leftIcon="lock-closed-outline"
          label="CONFIRM PASSWORD"
          control={control}
          name="confirmPassword"
          secureTextEntry
          placeholder="Confirm your password"
        />

        <AppButton className="mt-6" onPress={onSubmit}>
          Registrar
        </AppButton>

        <View className="mt-16">
          <Text className="text-base mb-6 text-gray-300">
            Already have an account?
          </Text>
          <AppButton
            className="mb-6"
            variant="outlined"
            onPress={() => router.push("/(public)/login")}
          >
            Login
          </AppButton>
        </View>
      </ScrollView>
    </KeyboardContainer>
  );
};
