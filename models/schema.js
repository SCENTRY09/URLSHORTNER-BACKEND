import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),

  firstname: varchar("first_name", { length: 55 })
    .notNull(),

  lastname: varchar("last_name", { length: 55 }),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  password: text("password")
    .notNull(),

  salt: text("salt")
    .notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const urlTable = pgTable("url", {
  id: uuid("id").defaultRandom().primaryKey(),

  code: varchar("code", { length: 155 })
    .notNull()
    .unique(),

  targetUrl: text("target_url").notNull(),

  userId: uuid("user_id").references(() => usersTable.id) .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

      updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});


