import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  SECRET_TOKEN: z.string(),
  EXPIRESIN_TOKEN: z.string().default("18h"),
  KEY_TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);
