import { marketplaceApi } from "../api/marketplace";
import { PaginatedResponse } from "../interfaces/http/paginated-response";
import { ProductReq } from "../interfaces/http/product";
import { GetProductCommentsInterface } from "../interfaces/http/product-comments";
import { GetProductDetailsInterface } from "../interfaces/http/product-detail";
import { ProductCategory, ProductInterface } from "../interfaces/product";
import { ProductComment } from "../interfaces/product-comment";

export const getProducts = async (params: ProductReq) => {
  const { data } = await marketplaceApi.post<
    PaginatedResponse<ProductInterface>
  >("/products", params);

  return data;
};

export const getProductsCategories = async () => {
  const { data } = await marketplaceApi.get<ProductCategory[]>(
    "/products/categories",
  );

  return data;
};

export const getProductById = async (id: number) => {
  const { data } = await marketplaceApi.get<GetProductDetailsInterface>(
    `/products/${id}`,
  );

  return data;
};

export const getProductComments = async (
  params: GetProductCommentsInterface,
) => {
  const { data } = await marketplaceApi.post<PaginatedResponse<ProductComment>>(
    `/products/comments`,
    params,
  );
  return data;
};
