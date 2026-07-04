import axios, { AxiosInstance } from "axios";

export class MarketplaceApi {
  private instance: AxiosInstance;
  private isRefreshing = false;

  constructor() {
    this.instance = axios.create({
      baseURL: "",
    });
  }

  getInstance() {
    return this.instance;
  }
}

export const marketplaceApi = new MarketplaceApi().getInstance();
