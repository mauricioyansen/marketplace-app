import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View>
      <Text>Marketplace App Expo Router!</Text>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
