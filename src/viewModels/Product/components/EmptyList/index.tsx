import { FC } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "../../../../styles/colors";

interface EmptyListParams {
  isLoadingComments: boolean;
}

export const EmptyList: FC<EmptyListParams> = ({ isLoadingComments }) => {
  if (isLoadingComments) {
    return (
      <View className="items-center py-8">
        <ActivityIndicator color={colors["purple-base"]} size="small" />
        <Text className="mt-2 text-gray-500">Loading comments...</Text>
      </View>
    );
  }
  return (
    <View className="items-center py-8">
      <Text className="text-gray-500 text-base">
        There are no comments yet for this product.
      </Text>
      <Text className="text-gray-400 text-sm mt-1">
        Be the first to leave a comment and share your thoughts!
      </Text>
    </View>
  );
};
