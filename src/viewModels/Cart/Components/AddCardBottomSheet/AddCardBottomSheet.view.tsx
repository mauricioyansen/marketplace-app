import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppButton } from "../../../../shared/components/AppButton";
import { colors } from "../../../../styles/colors";
import { useAddCardBottomSheetViewModel } from "./useAddCardBottomSheet.viewModel";
import { AppInputController } from "../../../../shared/components/AppInputController";
import { CreditCard } from "./components/CreditCard";

export const AddCardBottomSheetView: FC<
  ReturnType<typeof useAddCardBottomSheetViewModel>
> = ({
  handleCreateCreditCard,
  control,
  expirationDateMask,
  cardNumberMask,
  handleFieldBlur,
  handleFieldFocus,
  isFlipped,
  focusedField,
}) => {
  return (
    <ScrollView className="flex-1">
      <View className="p-8">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-base font-bold text-gray-500">
            Add new card
          </Text>
          <TouchableOpacity className="w-8 items-center justify-center border border-gray-400 rounded-[10px]">
            <Ionicons name="close-outline" size={24} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>

        <CreditCard focusedField={focusedField} isFlipped={isFlipped} />

        <View className="mt-6 gap-4">
          <AppInputController
            control={control}
            name="name"
            leftIcon="person-outline"
            label="FULL NAME"
            placeholder="Full Name"
            onFocus={() => handleFieldFocus("name")}
            onBlur={handleFieldBlur}
          />
          <AppInputController
            control={control}
            name="number"
            leftIcon="card-outline"
            label="CARD NUMBER"
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            mask={cardNumberMask}
            maxLength={19}
            onFocus={() => handleFieldFocus("number")}
            onBlur={handleFieldBlur}
          />
          <View className="flex-row gap-4">
            <View className="flex-1">
              <AppInputController
                control={control}
                name="expirationDate"
                leftIcon="calendar-outline"
                label="EXPIRATION DATE"
                placeholder="MM/AA"
                keyboardType="numeric"
                maxLength={5}
                mask={expirationDateMask}
                onFocus={() => handleFieldFocus("expiry")}
                onBlur={handleFieldBlur}
              />
            </View>
            <View className="flex-1">
              <AppInputController
                control={control}
                name="CVV"
                leftIcon="lock-closed-outline"
                label="CVV"
                placeholder="000"
                keyboardType="numeric"
                onFocus={() => handleFieldFocus("cvv")}
                onBlur={handleFieldBlur}
              />
            </View>
          </View>
        </View>

        <View className="flex-row gap-4 pb-5 mt-8">
          <View className="flex-1">
            <AppButton variant="outlined">Cancel</AppButton>
          </View>
          <View className="flex-1">
            <AppButton onPress={handleCreateCreditCard}>Save</AppButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
