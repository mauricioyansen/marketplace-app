import { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useReviewBottomSheetViewModel } from "./useReviewBottomSheet.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { AppInput } from "../../../../shared/components/AppInput";
import { AppButton } from "../../../../shared/components/AppButton";
import { Stars } from "./Components/Stars";

export const ReviewBottomSheetView: FC<
  ReturnType<typeof useReviewBottomSheetViewModel>
> = ({
  handleContentChange,
  handleRatingChange,
  ratingForm,
  handleFormSubmit,
  isLoading,
}) => {
  return (
    <View className="bg-background rounded-t-2xl">
      <View className="flex-row items-center justify-between p-6">
        <Text className="text-lg font-bold text-gray-900">
          {ratingForm.isEditing ? "Edit Review" : "Write a Review"}
        </Text>

        <TouchableOpacity
          className="size-8 items-center justify-center rounded-xl border border-gray-400"
          onPress={() => {}}
        >
          <Ionicons name="close" size={24} color={colors.gray[400]} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="p-6 items-center justify-center min-h-[300px]">
          <ActivityIndicator size="large" color={colors["purple-base"]} />
          <Text className="text-center text-gray-600 mt-4">
            Verifying available review, Please wait...
          </Text>
        </View>
      ) : (
        <View className="p-6">
          <Text className="font-semibold text-base text-gray-300">Nota</Text>
          <View className="flex-row items-center mb-6 gap-2">
            <Stars
              rating={ratingForm.rating}
              onChangeRating={handleRatingChange}
            />
          </View>

          <AppInput
            onChangeText={handleContentChange}
            label="REVIEW"
            placeholder={
              ratingForm.isEditing ? "Edit your review" : "Write your review"
            }
            value={ratingForm.content}
            multiline
            numberOfLines={8}
            textAlign="left"
            textAlignVertical="top"
            containerClassName="mb-8"
            className="h-36"
          />

          <View className="flex-row gap-3 mb-6">
            <AppButton className="flex-1" variant="outlined" onPress={() => {}}>
              Cancel
            </AppButton>

            <AppButton onPress={handleFormSubmit} className="flex-1">
              {ratingForm.isEditing ? "Update Review" : "Submit Review"}
            </AppButton>
          </View>
        </View>
      )}
    </View>
  );
};
