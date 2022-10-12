//TODO: I don't know if this is the best way of doing this. Loopback before PR
export abstract class Default {
  public static readonly API_BASE: string = 'http://localhost:3000';

  public static readonly SERVER_HOST: string = '0.0.0.0';
  public static readonly SERVER_PORT: number = 3000;

  public static readonly DB_NAME: string = 'postgres';
  public static readonly DB_HOST: string = 'localhost';
  public static readonly DB_PORT: number = 5432;
  public static readonly DB_USER: string = 'postgres';
  public static readonly DB_PASSWORD: string = 'postgres';

  public static readonly MAX_EVENTS: number = 100;

  public static readonly JWT_SECRET: string = 'something';
  public static readonly JWT_EXPIRES_IN: string = '15m';

  public static readonly MDNS_TO_PATH: string = '/well-known/wot-thing-description';
  public static readonly MDNS_NAME: string = 'zion';
}
