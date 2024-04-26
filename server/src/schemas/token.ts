import { text, pgTable, serial, integer } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";

export const tokens = pgTable("allergens", {
  id: serial("id").primaryKey(),
  userId: integer("user").references(() => users.id),
  refreshToken: text("refreshToken"),
});

export type Token = typeof tokens.$inferSelect;
export type NewToken = typeof tokens.$inferInsert;

export const tokenRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
