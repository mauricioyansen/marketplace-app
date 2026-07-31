import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/product.service";

export const useProductInfiniteQuery = () => {
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
    queryKey: ["products"],
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
