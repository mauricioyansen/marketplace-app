import { TouchableOpacity, View, Text } from "react-native";
import { AuthFormHeader } from "../../shared/components/AuthFormHeader";
import { AppInput } from "../../shared/components/AppInput";
import { router } from "expo-router";
import { KeyboardContainer } from "../../shared/components/KeyboardContainer";
import { FC } from "react";
import { useLoginViewModel } from "./useLogin.viewModel";
import { AppInputController } from "../../shared/components/AppInputController";

export const LoginView: FC<ReturnType<typeof useLoginViewModel>> = ({
  control,
  onSubmit,
}) => {
  return (
    <KeyboardContainer>
      <View className="flex-1 items-center justify-center px-10">
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
        />

        <TouchableOpacity onPress={onSubmit}>
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardContainer>
  );
};
