import type { Config } from "drizzle-kit";
export default {
  schema: "./src/schemas/index.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
