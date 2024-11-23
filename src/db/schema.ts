import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 32 }).notNull().unique(),
  username: varchar('username', { length: 30 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  lastSignInAt: timestamp('last_sign_in_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

