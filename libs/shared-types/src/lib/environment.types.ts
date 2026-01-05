export type Environment = 'local' | 'staging' | 'production';

export interface DatabaseConfig {
  uri: string;
}

type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

export interface JwtConfig {
  secret: string;
  expire: string | number | StringValue;
}

export interface OAuthProviderConfig {
  clientId?: string;
  clientSecret?: string;
  callbackUrl: string;
  appId?: string;
  appSecret?:string;
}

export interface OAuthConfig {
  google: OAuthProviderConfig;
  facebook: OAuthProviderConfig;
}

export interface PaymentConfig {
  stripeSecretKey: string;
  amount: number;
  currency: string;
}

export interface ClientConfig {
  url: string;
}

export interface CorsConfig {
  origin: string | string[];
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface EnvironmentConfig {
  env: Environment;
  port: number;
  baseUrl: string;
  database: DatabaseConfig;
  jwt: JwtConfig;
  oauth: OAuthConfig;
  payment: PaymentConfig;
  client: ClientConfig;
  cors: CorsConfig;
  rateLimit: RateLimitConfig;
}
