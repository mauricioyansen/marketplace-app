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
import { BASE_URL } from "../../../../shared/api/marketplace";

const fallbackImage = require("../../../../assets/images/logo.png");

const normalizeImageUrl = (photo?: string | null) => {
  if (!photo) return null;

  const value = photo.trim();

  if (!value) return null;

  if (
    value.startsWith("http://localhost") ||
    value.startsWith("https://localhost")
  ) {
    const path = value.replace(
      /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?/i,
      "",
    );
    return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  }

  if (value.startsWith("/")) {
    return `${BASE_URL}${value}`;
  }

  return value;
};

export const ProductCardView: FC<
  ReturnType<typeof useProductCardViewModel>
> = ({ product }) => {
  const imageUri = normalizeImageUrl(product.photo);
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2;

  return (
    <TouchableOpacity
      style={{ width: cardWidth }}
      className="rounded-xl shadow-sm overflow-hidden h-[157px] p-1 bg-white mb-4"
    >
      <View>
        <Image
          source={imageUri ? { uri: imageUri } : fallbackImage}
          className="w-full h-24 rounded-md"
          resizeMode="cover"
        />

        <View
          className="absolute top-0 right-0 flex-row items-center px-2 py-1 bg-white"
          style={{ borderBottomLeftRadius: 8 }}
        >
          <Ionicons name="star" size={12} color={colors["blue-base"]} />
          <Text className="text-sm font-semibold ml-1">
            {product.ratingCount}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="text-xs font-semibold mb-1" numberOfLines={1}>
          {product.name}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text>R$ {product.value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
