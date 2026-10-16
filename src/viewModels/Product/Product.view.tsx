import { FC } from "react";
import { FlatList } from "react-native";
import { useProductViewModel } from "./useProduct.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header";
import { CommentItem } from "./components/CommentItem";
import { ListFooter } from "./components/ListFooter";
import { EmptyList } from "./components/EmptyList";
import { Loading } from "./components/Loading";
import { ProductError } from "./components/Error";
import { AddToCartFooter } from "./components/AddToCartFooter";

export const ProductView: FC<ReturnType<typeof useProductViewModel>> = ({
  error,
  isLoading,
  productDetails,
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
}) => {
  if (error) return <ProductError />;

  if (isLoading || !productDetails) return <Loading />;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListHeaderComponent={
          <Header
            handleOpenReviewBottomSheet={handleOpenReviewBottomSheet}
            productDetails={productDetails}
          />
        }
        className="px-6"
        onEndReached={handleEndReached}
        onRefresh={handleRefetch}
        refreshing={isRefetching}
        ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
        ListEmptyComponent={<EmptyList isLoadingComments={isCommentsLoading} />}
        contentContainerClassName="pb-6"
      />
      <AddToCartFooter
        product={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </SafeAreaView>
  );
};
