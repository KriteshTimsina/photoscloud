import { sql } from "drizzle-orm";
import {
  timestamp,
  varchar,
  boolean,
  text,
  integer,
  primaryKey,
  pgTable,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// export const pgTable = pgTableCreator((name) => `photos_cloud_${name}`);

export const photosSchema = pgTable("photo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => sql`gen_random_uuid()`),
  url: varchar("url", { length: 256 }),
  favourite: boolean("favorite").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  userId: text("userId")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
});

export const userSchema = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => sql`gen_random_uuid()`),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accountSchema = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => userSchema.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export type IPhoto = typeof photosSchema.$inferSelect;
