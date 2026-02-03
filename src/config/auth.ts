import { SignOptions } from "jsonwebtoken";
import { env } from "../validations/envSchema";

export const authConfig = {
  jwt: {
    secret: env.SECRET_TOKEN as string,
    expiresIn: env.EXPIRESIN_TOKEN as SignOptions["expiresIn"],
  },
};
