import { View, Text, TouchableOpacity } from "react-native";
import { useRegisterViewModel } from "./userRegister.viewModel";
import { FC, useState } from "react";
import { AppInput } from "../../shared/components/AppInput";
import { Controller } from "react-hook-form";
import { AppInputController } from "../../shared/components/AppInputController";

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({
  onSubmit,
  control,
}) => {
  const [email, setEmail] = useState("");

  return (
    <View className="flex-1 items-center justify-center">
      <AppInputController
        leftIcon="mail-outline"
        label="EMAIL"
        control={control}
        name="email"
        // errors={{ email: { message: "Invalid email" } }}
      />

      <TouchableOpacity onPress={onSubmit}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
