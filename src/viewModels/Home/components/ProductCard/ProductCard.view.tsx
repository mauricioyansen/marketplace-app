import { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { useProductCardViewModel } from "./useProductCard.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { AppPriceText } from "../../../../shared/components/AppPriceText";
import { router } from "expo-router";
import { normalizeImageUrl } from "../../../../shared/utils/normalizeImageUrl";

export const ProductCardView: FC<
  ReturnType<typeof useProductCardViewModel>
> = ({ product, formatRating }) => {
  const imageUri = normalizeImageUrl(product.photo);
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${product.id}`)}
      style={{ width: cardWidth }}
      className="rounded-xl shadow-sm overflow-hidden h-[157px] p-1 bg-white mb-4"
    >
      <View>
        <Image
          source={imageUri}
          className="w-full h-24 rounded-md"
          resizeMode="cover"
        />

        <View
          className="absolute top-0 right-0 flex-row items-center px-2 py-1 bg-white"
          style={{ borderBottomLeftRadius: 8 }}
        >
          <Ionicons name="star" size={12} color={colors["blue-base"]} />
          <Text className="text-sm font-semibold ml-1">{formatRating}</Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="text-xs font-semibold mb-1" numberOfLines={1}>
          {product.name}
        </Text>

        <View className="flex-row items-center justify-between">
          <AppPriceText
            classNameCurrency="text-small"
            classNameValue="text-lg font-bold flex-1"
            value={Number(product.value)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
