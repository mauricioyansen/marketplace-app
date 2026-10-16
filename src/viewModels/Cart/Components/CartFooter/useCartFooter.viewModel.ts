import { router } from "expo-router";
import { useState } from "react";
import { CreditCard } from "../../../../shared/interfaces/credit-card";
import { useSubmitOrderMutation } from "../../../../shared/queries/orders/use-submit-order.mutation";
import { useCartStore } from "../../../../shared/store/cart-store";
import { useAppModal } from "../../../../shared/hooks/useAppModal";
import { localNotificationsService } from "../../../../shared/services/local-notifications.service";

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

    const firstProduct = products[0];

    if (firstProduct) {
      localNotificationsService.scheduleFeedbackNotification({
        delayInSeconds: 60,
        productId: firstProduct.id,
        productName: firstProduct.name,
      });
    }

    products.forEach(({ id, name }, index) => {
      localNotificationsService.cancelNotifications(
        `${localNotificationsService.NOTIFICATION_IDS.CART_REMINDER}-${id}`,
      );

      localNotificationsService.scheduleFeedbackNotification({
        delayInSeconds: 60 * (index + 1),
        productId: id,
        productName: name,
      });
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
