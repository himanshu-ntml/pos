"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allergens = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.allergens = (0, pg_core_1.pgTable)("allergens", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name"),
});
