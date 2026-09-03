import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/product.service";

export const useGetProductDetailQuery = (productId: number) => {
  const query = useQuery({
    queryFn: () => getProductById(productId),
    queryKey: ["product-details", productId],
  });

  return query;
};
