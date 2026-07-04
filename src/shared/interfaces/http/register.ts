import { UserInterface } from "../user";

export interface RegisterHttpRequest {
  name: string;
  email: string;
  avatarUrl: string;
  phone: string;
  password: string;
}

export interface RegisterHttpResponse {
  user: UserInterface;
  token: string;
  refreshToken: string;
}
