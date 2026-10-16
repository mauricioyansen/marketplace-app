import { router } from "expo-router";
import { useGetProductCommentsInfiniteQuery } from "../../shared/queries/product/use-get-product-comments-infinite.query";
import { useGetProductDetailQuery } from "../../shared/queries/product/use-get-product-details";
import { useModalStore } from "../../shared/store/modal-store";
import { useCartStore } from "../../shared/store/cart-store";
import { AddToCartSuccessModal } from "./components/AddToCartSuccessModal";
import { createElement, useEffect } from "react";
import { ReviewBottomSheet } from "./components/ReviewBottomSheet";
import { useBottomSheetStore } from "../../shared/store/bottomSheet-store";
import { localNotificationsService } from "../../shared/services/local-notifications.service";

export const useProductViewModel = (
  productId: number,
  openFeedbackBottomSheet?: boolean,
) => {
  const {
    data: productDetails,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);

  const {
    comments,
    isLoading: isCommentsLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    error: commentsError,
    isRefetching,
    isFetchingNextPage,
  } = useGetProductCommentsInfiniteQuery(productId);

  const { addProduct, products } = useCartStore();

  const { open, close } = useModalStore();

  const { open: openBottomSheet } = useBottomSheetStore();

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefetch = () => {
    if (!isRefetching) {
      refetch();
    }
  };

  const handleEndReached = () => {
    handleLoadMore();
  };

  const onGoToCart = () => {
    router.push("/(private)/(tabs)/cart");
    close();
  };

  const onContinueShopping = () => {
    router.push("/(private)/(tabs)/home");
    close();
  };

  const handleAddToCart = () => {
    if (!productDetails) return;

    addProduct({
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.value,
      image: productDetails.photo,
    });

    localNotificationsService.scheduleCartReminder({
      delayInSeconds: 30 * 60, // Para testar, troque temporariamente por 5 segundos.
      productId: productDetails.id,
      productName: productDetails.name,
    });

    open(
      createElement(AddToCartSuccessModal, {
        productName: productDetails.name,
        onGoToCart,
        onClose: close,
        onContinueShopping,
      }),
    );
  };

  const handleOpenReviewBottomSheet = () => {
    if (!productDetails) return;

    openBottomSheet({
      content: createElement(ReviewBottomSheet, { productId }),
    });
  };

  useEffect(() => {
    if (openFeedbackBottomSheet) {
      handleOpenReviewBottomSheet();
    }
  }, [openFeedbackBottomSheet, productDetails]);

  return {
    productDetails,
    isLoading,
    error,
    comments,
    isCommentsLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    commentsError,
    isRefetching,
    isFetchingNextPage,
    handleLoadMore,
    handleRefetch,
    handleEndReached,
    handleAddToCart,
    handleOpenReviewBottomSheet,
  };
};
