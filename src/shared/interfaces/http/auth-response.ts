import { UserInterface } from "../user";

export interface AuthHttpResponse {
  user: UserInterface;
  token: string;
  refreshToken: string;
}
