import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { AppButton } from "../../../../shared/components/AppButton";
import { AppPriceText } from "../../../../shared/components/AppPriceText";
import { colors } from "../../../../styles/colors";

export const CartFooter = () => {
  return (
    <View className="bg-white p-4 rounded-lg mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-[10px] font-semibold text-gray-600 uppercase">
          Total value
        </Text>
        <AppPriceText
          value={190}
          classNameCurrency="text-base text-gray-900 font-bold"
          classNameValue="text-base text-gray-900 font-bold"
        />
      </View>

      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-[10px] font-semibold text-gray-600 uppercase">
            Credit cards
          </Text>

          <TouchableOpacity className="flex-row items-center">
            <Ionicons
              name="card-outline"
              size={20}
              color={colors["purple-base"]}
            />
            <Text className="text-purple-base ml-2 font-bold">Add card</Text>
          </TouchableOpacity>
        </View>

        <AppButton className="mt-4">Confirm Purchase</AppButton>
      </View>
    </View>
  );
};
