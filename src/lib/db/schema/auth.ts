import { z } from "zod";
import { pgTable, timestamp, text, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  deleted: boolean("deleted").notNull().default(false),
  deletedAt: timestamp("deleted_at", {
    withTimezone: true,
    mode: "date",
  }),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const authenticationSchema = z.object({
  email: z.string().email().min(5).max(64),
  password: z
    .string()
    .min(4, { message: "must be at least 4 characters long" })
    .max(15, { message: "cannot be more than 15 characters long" }),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().min(4).optional(),
});

export type UsernameAndPassword = z.infer<typeof authenticationSchema>;
