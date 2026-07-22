import { FC } from "react";
import { View, Text } from "react-native";
import { useProductCardViewModel } from "./useProductCard.viewModel";

export const ProductCardView: FC<
  ReturnType<typeof useProductCardViewModel>
> = ({ product }) => {
  return (
    <View>
      <Text>{product.name}</Text>
    </View>
  );
};
