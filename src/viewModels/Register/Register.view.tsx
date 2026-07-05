import { View, Text, TouchableOpacity } from "react-native";
import { useRegisterViewModel } from "./userRegister.viewModel";
import { FC } from "react";

export const RegisterView: FC<ReturnType<typeof useRegisterViewModel>> = ({
  onSubmit,
}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={onSubmit}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
