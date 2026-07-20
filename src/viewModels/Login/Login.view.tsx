import { View, Text } from "react-native";
import { AuthFormHeader } from "../../shared/components/AuthFormHeader";
import { router } from "expo-router";
import { KeyboardContainer } from "../../shared/components/KeyboardContainer";
import { FC } from "react";
import { useLoginViewModel } from "./useLogin.viewModel";
import { AppInputController } from "../../shared/components/AppInputController";
import { AppButton } from "../../shared/components/AppButton";

export const LoginView: FC<ReturnType<typeof useLoginViewModel>> = ({
  control,
  onSubmit,
}) => {
  return (
    <KeyboardContainer>
      <View className="flex-1 items-center justify-center px-10">
        <View className="flex-1 w-full items-center justify-center">
          <AuthFormHeader title="Welcome back" subtitle="Sign in to continue" />

          <AppInputController
            control={control}
            name="email"
            leftIcon="mail-outline"
            label="EMAIL"
            placeholder="mail@example.com"
          />

          <AppInputController
            control={control}
            name="password"
            leftIcon="lock-closed-outline"
            label="PASSWORD"
            placeholder="Your password"
            secureTextEntry
          />

          <AppButton
            className="mt-6"
            rightIcon="arrow-forward"
            onPress={onSubmit}
          >
            Login
          </AppButton>
        </View>

        <View className="flex-2 pb-16">
          <Text className="text-base mb-6 text-gray-300">
            Does not have an account?
          </Text>
          <AppButton
            variant="outlined"
            rightIcon="arrow-forward"
            onPress={() => router.push("/(public)/register")}
          >
            Register
          </AppButton>
        </View>
      </View>
    </KeyboardContainer>
  );
};
