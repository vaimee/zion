export interface AuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
