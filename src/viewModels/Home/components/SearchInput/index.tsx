import { View, Text, TouchableOpacity } from "react-native";
import { AppInput } from "../../../../shared/components/AppInput";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { useBottomSheetStore } from "../../../../shared/store/bottomSheet-store";
import { Filter } from "../Filter";
import { FC } from "react";

interface SearchInputParams {
  onSearchTextChange?: (text: string) => void;
  inputValue?: string;
}

export const SearchInput: FC<SearchInputParams> = ({
  onSearchTextChange,
  inputValue,
}: SearchInputParams) => {
  const { open } = useBottomSheetStore();

  return (
    <View className="mb-3 mt-6">
      <Text className="text-2xl font-bold mt-6">Explore products</Text>
      <View className="flex-row">
        <View className="flex-1">
          <AppInput
            onChangeText={onSearchTextChange}
            value={inputValue}

            placeholder="Search products"
            leftIcon="search"
            returnKeyType="search"
            className="text-lg flex-1"
          />
        </View>

        <TouchableOpacity
          onPress={() => open({ content: <Filter />, config: {} })}
          className="ml-5 mt-6 items-center justify-center rounded-lg border size-12 border-purple-base"
        >
          <Ionicons
            name="filter-outline"
            size={24}
            color={colors["purple-base"]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
