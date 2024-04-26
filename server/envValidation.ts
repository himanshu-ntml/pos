import { z } from "../client/node_modules/zod";

export const envVariablesSchema = z.object({
  ENV: z.string(),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_REFRESH_SECRET: z.string(),
  CLIENT_URL: z.string(),
});

envVariablesSchema.parse(process.env);

export type envVariablesType = z.infer<typeof envVariablesSchema>;
