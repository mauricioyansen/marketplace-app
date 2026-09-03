import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "./components/ProductCard";
import { FC } from "react";
import { useHomeViewModel } from "./useHome.viewModel";
import { Footer } from "./components/Footer";
import { colors } from "../../styles/colors";
import { RenderHeader } from "./components/RenderHeader";

export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({
  products,
  handleEndReached,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  handleRefresh,
  isRefetching,
  setSearchText,
  searchText,
}) => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={({ id }) => `product-list-item-${id}`}
        numColumns={2}
        ListFooterComponent={
          <Footer
            isLoading={hasNextPage && Boolean(isLoading || isFetchingNextPage)}
          />
        }
        onEndReached={handleEndReached}
        columnWrapperStyle={{ gap: 16 }}
        ListHeaderComponent={
          <RenderHeader
            searchInputText={searchText}
            setSearchInputText={setSearchText}
          />
        }
        contentContainerClassName="px-4 pb-[120px]"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            colors={[colors["purple-base"]]}
            tintColor={colors["purple-base"]}
            onRefresh={handleRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};
