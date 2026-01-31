import { pgTable, unique, uuid, varchar, text, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 55 }).notNull(),
	lastName: varchar("last_name", { length: 55 }),
	email: varchar({ length: 255 }).notNull(),
	password: text().notNull(),
	salt: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const url = pgTable("url", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	code: varchar({ length: 155 }).notNull(),
	targetUrl: text("target_url").notNull(),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "url_user_id_users_id_fk"
		}),
	unique("url_code_unique").on(table.code),
]);
