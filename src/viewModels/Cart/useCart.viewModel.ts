import { createElement } from "react";
import { useBottomSheetStore } from "../../shared/store/bottomSheet-store";
import { useCartStore } from "../../shared/store/cart-store";
import { AddCardBottomSheet } from "./Components/AddCardBottomSheet";
import { useGetCreditCards } from "../../shared/queries/credit-cards/use-get-credit-cards.query";

export const useCartViewModel = () => {
  const { products } = useCartStore();

  const { open: openBottomSheet } = useBottomSheetStore();

  const { data: creditCards = [], isLoading: isCreditCardsLoading } =
    useGetCreditCards();

  const openCartBottomSheet = () => {
    openBottomSheet({ content: createElement(AddCardBottomSheet) });
  };

  return { products, openCartBottomSheet, creditCards, isCreditCardsLoading };
};
