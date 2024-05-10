"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserSchema = exports.userSchema = exports.profileInfoRelations = exports.profileInfo = exports.usersRelations = exports.users = exports.userRoles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_zod_1 = require("drizzle-zod");
exports.userRoles = (0, pg_core_1.pgEnum)("user_roles", ["admin", "user", "waiter", "chef", "manager"]);
exports.users = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name"),
    email: (0, pg_core_1.text)("email").unique().notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    role: (0, exports.userRoles)("role").default("user").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ one }) => ({
    profileInfo: one(exports.profileInfo),
}));
exports.profileInfo = (0, pg_core_1.pgTable)("profile", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    image: (0, pg_core_1.text)("image"),
    phone: (0, pg_core_1.text)("phone"),
    address: (0, pg_core_1.text)("address"),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.profileInfoRelations = (0, drizzle_orm_1.relations)(exports.profileInfo, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.profileInfo.userId],
        references: [exports.users.id],
    }),
}));
exports.userSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users);
exports.newUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users);
