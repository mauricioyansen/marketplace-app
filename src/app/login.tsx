import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function Login() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Login</Text>
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text>Go to Register</Text>
      </TouchableOpacity>
    </View>
  );
}
