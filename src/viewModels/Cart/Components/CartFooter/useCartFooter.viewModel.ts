import { router } from "expo-router";
import { useState } from "react";
import { CreditCard } from "../../../../shared/interfaces/credit-card";
import { useSubmitOrderMutation } from "../../../../shared/queries/orders/use-submit-order.mutation";
import { useCartStore } from "../../../../shared/store/cart-store";
import { useAppModal } from "../../../../shared/hooks/useAppModal";

export const useCartFooterViewModel = () => {
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<null | CreditCard>(null);
  const { products, total, clearCart } = useCartStore();

  const { showSuccess } = useAppModal();

  const createOrderMutation = useSubmitOrderMutation();

  const submitOrderMutation = async () => {
    if (!selectedCreditCard) return;

    await createOrderMutation.mutateAsync({
      creditCardId: selectedCreditCard.id,
      items: products.map(({ id, quantity }) => ({ productId: id, quantity })),
    });

    clearCart();

    showSuccess({
      title: "Success",
      message: "Your order has been placed successfully.",
      buttonText: "Go to Orders",
      onButtonPress: () => {
        router.push("/orders");
      },
    });
  };

  return {
    total,
    selectedCreditCard,
    setSelectedCreditCard,
    submitOrderMutation,
    isLoadingOrder: createOrderMutation.isPending,
  };
};
