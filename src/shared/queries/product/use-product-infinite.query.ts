import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/product.service";
import { FilterState } from "../../store/use-filter-store";

interface ProductsInfiniteQueryParams {
  filters?: FilterState;
}

export const useProductInfiniteQuery = ({
  filters,
}: ProductsInfiniteQueryParams) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const res = await getProducts({
          pagination: { page: pageParam, perPage: 10 },
          filters: {
            categoryIds: filters?.selectedCategory || [],
            minValue: filters?.valueMin || undefined,
            maxValue: filters?.valueMax || undefined,
            searchText: filters?.searchText || undefined,
          },
        });

        return res;
      } catch (err) {
        throw err;
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    queryKey: ["products", filters],
    staleTime: 1000 * 60 * 1,
  });

  const products = data?.pages.flatMap((page) => page.data);

  // console.log("PRODUCT", products);

  return {
    products,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  };
};
