export interface AuthPayload {
  id: number;
  email: string;
  role: string;
  orgId?: number;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: AuthPayload;
}
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}
export interface RefreshTokenRequest {
  refreshToken: string;
}
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
