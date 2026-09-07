import { FC } from "react";
import { View } from "react-native";
import { AppButton } from "../../../../shared/components/AppButton";
import { AppPriceText } from "../../../../shared/components/AppPriceText";
import { ProductInterface } from "../../../../shared/interfaces/product";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AddToCardFooterParams {
  product: ProductInterface;
  handleAddToCart: () => void;
}

export const AddToCardFooter: FC<AddToCardFooterParams> = ({
  product,
  handleAddToCart,
}) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="fixed justify-between items-center bg-white bottom-0 right-0 left-0 px-7 pt-7 flex-row"
      style={{ paddingBottom: bottom + 28 }}
    >
      <AppPriceText value={Number(product.value)} />

      <AppButton
        onPress={handleAddToCart}
        leftIcon="cart-outline"
        className="w-36 h-[40px]"
      >
        Add to cart
      </AppButton>
    </View>
  );
};
