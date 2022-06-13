export type JwtPayload = {
  sub: number; // User ID
  iat: number;
  exp: number;
};
