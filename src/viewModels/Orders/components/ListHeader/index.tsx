import { Text, View } from "react-native";

export const ListHeader = () => {
  return (
    <View className="py-3 gap-1 mb-4">
      <Text className="text-[20px] font-bold text-gray-800">Orders</Text>
      <Text className="text-gray-400">
        Check your list of purchased products
      </Text>
    </View>
  );
};
