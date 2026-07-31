import { marketplaceApi } from "../api/marketplace";
import { ProductReq } from "../interfaces/http/product";
import { ProductResponse } from "../interfaces/http/product-response";

export const getProducts = async (params: ProductReq) => {
  const { data } = await marketplaceApi.post<ProductResponse>(
    "/products",
    params,
  );

  return data;
};
