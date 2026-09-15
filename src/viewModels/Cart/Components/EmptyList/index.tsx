import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { AppButton } from "../../../../shared/components/AppButton";
import { colors } from "../../../../styles/colors";

export const EmptyList = () => {
  return (
    <>
      <View className="flex-1 items-center px-20 pt-16">
        <Ionicons name="cart-outline" size={80} color={colors.gray[200]} />

        <Text className="text-sm font-bold text-gray-400 my-4">
          Your cart is empty
        </Text>
        <Text className="text-sm text-gray-400 text-center mb-8">
          Explore the product catalog and make your first purchase!
        </Text>
      </View>
      <AppButton
        onPress={() => router.push("/home")}
        leftIcon="storefront-outline"
        variant="outlined"
        className="w-[197px] self-center"
      >
        Explore products
      </AppButton>
    </>
  );
};
