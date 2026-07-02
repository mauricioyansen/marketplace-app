import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View>
      <Text className="text-purple-base text-4xl font-bold">
        Marketplace App Expo Router!
      </Text>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
