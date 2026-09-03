import { useGetProductCommentsInfiniteQuery } from "../../shared/queries/product/use-get-product-comments-infinite.query";
import { useGetProductDetailQuery } from "../../shared/queries/product/use-get-product-details";

export const useProductViewModel = (productId: number) => {
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
  };
};
