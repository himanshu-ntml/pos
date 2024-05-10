"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariablesSchema = void 0;
const zod_1 = require("../client/node_modules/zod");
exports.envVariablesSchema = zod_1.z.object({
    ENV: zod_1.z.string(),
    PORT: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    AUTH_SECRET: zod_1.z.string(),
    AUTH_REFRESH_SECRET: zod_1.z.string(),
    CLIENT_URL: zod_1.z.string(),
});
exports.envVariablesSchema.parse(process.env);
