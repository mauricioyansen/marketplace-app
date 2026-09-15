import { Text, View } from "react-native";

export const CartHeader = () => {
  return (
    <View className="py-3 gap-1 mb-4">
      <Text className="text-[20px] font-bold text-gray-800">Cart</Text>
      <Text className="text-gray-400">View your shopping cart</Text>
    </View>
  );
};
