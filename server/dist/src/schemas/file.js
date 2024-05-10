"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.files = void 0;
// import { relations } from "drizzle-orm";
const pg_core_1 = require("drizzle-orm/pg-core");
// import { users } from "./user";
exports.files = (0, pg_core_1.pgTable)("files", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name"),
    url: (0, pg_core_1.text)("url"),
    uploadedBy: (0, pg_core_1.text)("uploaded_by"),
});
