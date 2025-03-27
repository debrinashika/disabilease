import { config } from 'dotenv';
config({ path: `.env`});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
  ORIGIN,
  VERSION,

  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;

export const ACCESS_TOKEN_EXPIRATION = parseInt(process.env.ACCESS_TOKEN_EXPIRATION);
export const REFRESH_TOKEN_EXPIRATION = parseInt(process.env.REFRESH_TOKEN_EXPIRATION);