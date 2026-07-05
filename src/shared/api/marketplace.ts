import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const getBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl;
  }

  const debuggerHost =
    (Constants as any).expoConfig?.hostUri ||
    (Constants as any).manifest?.debuggerHost;
  if (debuggerHost) {
    const host = debuggerHost.split(":")[0];
    return `http://${host}:3001`;
  }

  return Platform.select({
    ios: "http://localhost:3001",
    android: "http://10.0.2.2:3001",
  });
};

const BASE_URL = getBaseUrl();

export class MarketplaceApi {
  private instance: AxiosInstance;
  private isRefreshing = false;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
    });
  }

  getInstance() {
    return this.instance;
  }
}

export const marketplaceApi = new MarketplaceApi().getInstance();
