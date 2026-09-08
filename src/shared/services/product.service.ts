import { marketplaceApi } from "../api/marketplace";
import {
  CreateCommentRequest,
  CreateCommentResponse,
} from "../interfaces/http/create-comment";
import { PaginatedResponse } from "../interfaces/http/paginated-response";
import { ProductReq } from "../interfaces/http/product";
import { GetProductCommentsInterface } from "../interfaces/http/product-comments";
import { GetProductDetailsInterface } from "../interfaces/http/product-detail";
import {
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "../interfaces/http/update-comment";
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

export const createComment = async (params: CreateCommentRequest) => {
  const { data } = await marketplaceApi.post<CreateCommentResponse>(
    "/products/create/comments",
    params,
  );
  return data;
};

export const getUserComment = async (productId: number) => {
  const { data } = await marketplaceApi.get<{
    content: string;
    rating: number;
  }>(`/products/${productId}/user-comment`);
  return data;
};

export const updateUserComment = async (params: UpdateCommentRequest) => {
  const { data } = await marketplaceApi.put<UpdateCommentResponse>(
    `/products/comments/${params.commentId}`,
    {
      content: params.content,
      rating: params.rating,
    },
  );
  return data;
};
