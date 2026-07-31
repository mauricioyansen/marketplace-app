import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useUserStore } from "../store/user-store";

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

export const BASE_URL = getBaseUrl();

export class MarketplaceApi {
  private instance: AxiosInstance;
  private isRefreshing = false;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
    });

    this.setupInterceptors();
  }

  getInstance() {
    return this.instance;
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const userData = await AsyncStorage.getItem("marketplace-auth");

        if (userData) {
          const {
            state: { token },
          } = JSON.parse(userData);

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    this.instance.interceptors.response.use(
      (res) => res,
      async (err) => {
        alert("REFRESH FN");

        const originalReq = err.config;

        if (
          err.response?.status === 401 &&
          err.response?.data?.message === "Token expirado" &&
          !this.isRefreshing
        ) {
          this.isRefreshing = true;

          try {
            const userData = await AsyncStorage.getItem("marketplace-auth");

            if (!userData) {
              throw new Error("User not authenticated");
            }

            const {
              state: { refreshToken },
            } = JSON.parse(userData);

            if (!refreshToken) {
              throw new Error("Refresh token not found");
            }

            const { data: res } = await this.instance.post("/auth/refresh", {
              refreshToken,
            });

            const currentUserData = JSON.parse(userData);

            currentUserData.state.token = res.token;
            currentUserData.state.refreshToken = res.refreshToken;

            await AsyncStorage.setItem(
              "marketplace-auth",
              JSON.stringify(currentUserData),
            );

            originalReq.headers.Authorization = `Bearer ${res.token}`;

            return this.instance(originalReq);
          } catch (err) {
            this.handleUnauthorized();
            return Promise.reject(new Error("Session expired"));
          } finally {
            this.isRefreshing = false;
          }
        }

        if (err.response?.data) {
          return Promise.reject(new Error(err.response.data.message));
        } else {
          return Promise.reject(new Error("Request failed"));
        }
      },
    );
  }

  private async handleUnauthorized() {
    const { logout } = useUserStore.getState();
    delete this.instance.defaults.headers.common.Authorization;
    logout();
  }
}

export const marketplaceApi = new MarketplaceApi().getInstance();
