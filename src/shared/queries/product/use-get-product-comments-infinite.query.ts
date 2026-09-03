import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductComments } from "../../services/product.service";
import { ProductComment } from "../../interfaces/product-comment";

export const useGetProductCommentsInfiniteQuery = (productId: number) => {
  const query = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) =>
      getProductComments({
        productId,
        pagination: { page: pageParam, perPage: 20 },
      }),
    queryKey: ["product-comments", productId],
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    // staleTime: 1000,
  });

  const comments =
    (query.data?.pages.flatMap((page) => page.data) as ProductComment[]) ?? [];

  return {
    ...query,
    comments,
  };
};
