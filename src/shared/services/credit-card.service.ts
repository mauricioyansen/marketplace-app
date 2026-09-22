import { marketplaceApi } from "../api/marketplace";
import { CreditCard } from "../interfaces/credit-card";
import {
  CreateCreditCardRequestParams,
  CreateCreditCardResponse,
} from "../interfaces/http/create-credit-card";

export const getCreditCards = async () => {
  const { data } = await marketplaceApi.get<CreditCard[]>("/credit-cards");

  return data;
};

export const createCreditCard = async (
  creditCardData: CreateCreditCardRequestParams,
) => {
  const { data } = await marketplaceApi.post<CreateCreditCardResponse>(
    "/credit-cards",
    creditCardData,
  );
  return data;
};
