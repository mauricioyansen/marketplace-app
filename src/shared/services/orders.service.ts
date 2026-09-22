import { marketplaceApi } from "../api/marketplace";
import {
  SubmitOrderRequestParamsInterface,
  SubmitOrderResponse,
} from "../interfaces/http/orders";

export const submitOrder = async (order: SubmitOrderRequestParamsInterface) => {
  const { data } = await marketplaceApi.post<SubmitOrderResponse>(
    "/orders",
    order,
  );

  return data;
};
