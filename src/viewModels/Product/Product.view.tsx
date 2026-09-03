import { FC } from "react";
import { Text, FlatList } from "react-native";
import { useProductViewModel } from "./useProduct.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header";
import { CommentItem } from "./components/CommentItem";
import { ListFooter } from "./components/ListFooter";
import { EmptyList } from "./components/EmptyList";
import { Loading } from "./components/Loading";
import { GetProductDetailsInterface } from "../../shared/interfaces/http/product-detail";
import { ProductError } from "./components/Error";
import { AddToCardFooter } from "./components/AddToCardFooter";

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
}) => {
  if (error) return <ProductError />;

  if (isLoading || !productDetails) return <Loading />;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListHeaderComponent={<Header productDetails={productDetails} />}
        className="px-6"
        onEndReached={handleEndReached}
        onRefresh={handleRefetch}
        refreshing={isRefetching}
        ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
        ListEmptyComponent={<EmptyList isLoadingComments={isCommentsLoading} />}
        contentContainerClassName="pb-6"
      />
      <AddToCardFooter product={productDetails} />
    </SafeAreaView>
  );
};
