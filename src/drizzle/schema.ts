import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core'

export const schema = pgTable('users', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow()
})
