import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  timestamp,
  varchar,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `photos_store_${name}`);

export const photosSchema = createTable("photo", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: varchar("url", { length: 256 }),
  favourite: boolean("favorite").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export type IPhoto = typeof photosSchema.$inferSelect;
