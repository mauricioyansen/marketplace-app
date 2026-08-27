import { marketplaceApi } from "../api/marketplace";
import { ProductReq } from "../interfaces/http/product";
import { ProductResponse } from "../interfaces/http/product-response";
import { ProductCategory } from "../interfaces/product";

export const getProducts = async (params: ProductReq) => {
  const { data } = await marketplaceApi.post<ProductResponse>(
    "/products",
    params,
  );

  return data;
};

export const getProductsCategories = async () => {
  const { data } = await marketplaceApi.get<ProductCategory[]>(
    "/products/categories",
  );

  return data;
};
