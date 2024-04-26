import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "./schemas/index";

// https://github.com/neondatabase/serverless/issues/66
const client: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
