"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRelations = exports.tokens = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_1 = require("./user");
const drizzle_orm_1 = require("drizzle-orm");
exports.tokens = (0, pg_core_1.pgTable)("allergens", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user").references(() => user_1.users.id),
    refreshToken: (0, pg_core_1.text)("refreshToken"),
});
exports.tokenRelations = (0, drizzle_orm_1.relations)(exports.tokens, ({ one }) => ({
    user: one(user_1.users, {
        fields: [exports.tokens.userId],
        references: [user_1.users.id],
    }),
}));
