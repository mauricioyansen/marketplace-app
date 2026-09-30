import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFilterViewModel } from "./useFilter.viewModel";
import { colors } from "../../../../styles/colors";
import { AppInput } from "../../../../shared/components/AppInput";
import { AppButton } from "../../../../shared/components/AppButton";
import Checkbox from "expo-checkbox";

export const FilterView: FC<ReturnType<typeof useFilterViewModel>> = ({
  productCategory,
  isLoading,
  handleCategoryToggle,
  handleValueMaxChange,
  handleValueMinChange,
  selectedCategories,
  handleApplyFilters,
  handleResetFilters,
  close,
}) => {
  return (
    <View>
      <View className="flex-row items-center justify-between py-4 px-6">
        <Text className="text-lg font-bold text-gray-900">Filter products</Text>
        <TouchableOpacity onPress={close}>
          <Ionicons name="close" size={20} color={colors["purple-base"]} />
        </TouchableOpacity>
      </View>

      <View className="py-4 px-6">
        <Text className="font-semibold text-base text-gray-300">VALUE</Text>
        <View className="flex-row mb-4 w-full">
          <View className="flex-1">
            <AppInput
              onChangeText={(text) => handleValueMinChange(Number(text))}
              placeholder="From"
              keyboardType="numeric"
              containerClassName="w-[90%]"
            />
          </View>
          <View className="flex-1">
            <AppInput
              onChangeText={(text) => handleValueMaxChange(Number(text))}
              placeholder="To"
              keyboardType="numeric"
              containerClassName="w-[90%]"
            />
          </View>
        </View>

        <Text className="font-semibold text-base text-gray-300">CATEGORY</Text>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View className="mb-6 gap-3">
            {productCategory?.map((category) => (
              <TouchableOpacity
                onPress={() => handleCategoryToggle(category.id)}
                className="flex-row items-center py-2"
                key={category.id}
              >
                <Checkbox
                  value={selectedCategories.includes(category.id)}
                  onValueChange={() => handleCategoryToggle(category.id)}
                  color={colors["purple-base"]}
                  className="mr-3 rounded-full"
                />
                <Text className="text-base text-gray-400">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="flex-row gap-3 mt-4 mb-6">
          <View className="flex-1">
            <AppButton onPress={handleResetFilters} variant="outlined">
              Clear filter
            </AppButton>
          </View>
          <View className="flex-1">
            <AppButton onPress={handleApplyFilters}>Filter</AppButton>
          </View>
        </View>
      </View>
    </View>
  );
};
