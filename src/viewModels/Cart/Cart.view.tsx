import { FC } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartViewModel } from "./useCart.viewModel";
import { ProductCartCard } from "./Components/ProductCartCard";
import { EmptyList } from "./Components/EmptyList";
import { CartHeader } from "./Components/CartHeader";
import { CartFooter } from "./Components/CartFooter";

export const CartView: FC<ReturnType<typeof useCartViewModel>> = ({
  products,
  openCartBottomSheet,
  creditCards,
  isCreditCardsLoading,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        contentContainerClassName="px-6"
        data={products}
        // data={[]}
        renderItem={({ item }) => <ProductCartCard product={item} />}
        keyExtractor={({ id }) => `product-cart-id-${id}`}
        ListEmptyComponent={<EmptyList />}
        ListHeaderComponent={<CartHeader />}
        ListFooterComponent={
          products.length > 0 ? (
            <CartFooter
              openCartBottomSheet={openCartBottomSheet}
              creditCards={creditCards}
              loadingCreditCards={isCreditCardsLoading}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};
