import { text, timestamp, pgTable, serial, integer, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userRoles = pgEnum("user_roles", ["admin", "user", "waiter", "chef", "manager"]);

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: userRoles("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const usersRelations = relations(users, ({ one }) => ({
  profileInfo: one(profileInfo),
}));

export const profileInfo = pgTable("profile", {
  id: serial("id").primaryKey(),
  image: text("image"),
  phone: text("phone"),
  address: text("address"),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
  user: one(users, {
    fields: [profileInfo.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const userSchema = createSelectSchema(users);
export const newUserSchema = createInsertSchema(users);
