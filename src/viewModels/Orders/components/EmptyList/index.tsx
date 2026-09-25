import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { AppButton } from "../../../../shared/components/AppButton";
import { colors } from "../../../../styles/colors";

export const EmptyList = () => {
  return (
    <View className="flex-1 items-center px-20 pt-16">
      <Ionicons name="clipboard-outline" size={80} color={colors.gray[200]} />
      <Text className="text-xl font-bold text-gray-700 my-4 text-center">
        You haven't made any purchases yet
      </Text>
      <Text className="text-base text-gray-400 mb-8 text-center">
        Explore the product catalog and make your first purchase
      </Text>
      <AppButton
        variant="outlined"
        className="w-fit gap-3"
        leftIcon="storefront-outline"
        onPress={() => router.push("/home")}
      >
        Explore Products
      </AppButton>
    </View>
  );
};
