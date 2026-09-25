import { marketplaceApi } from "../api/marketplace";
import { GetOrdersResponse } from "../interfaces/http/get-orders";
import {
  SubmitOrderRequestParamsInterface,
  SubmitOrderResponse,
} from "../interfaces/http/submit-orders";

export const submitOrder = async (order: SubmitOrderRequestParamsInterface) => {
  const { data } = await marketplaceApi.post<SubmitOrderResponse>(
    "/orders",
    order,
  );

  return data;
};

export const getOrders = async () => {
  const { data } = await marketplaceApi.get<GetOrdersResponse>("/orders");

  return data;
};
