"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schema: "./src/schemas/index.ts",
    driver: "pg",
    out: "./drizzle",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
};
