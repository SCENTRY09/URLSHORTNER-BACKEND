import { relations } from "drizzle-orm/relations";
import { users, url } from "./schema";

export const urlRelations = relations(url, ({one}) => ({
	user: one(users, {
		fields: [url.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	urls: many(url),
}));