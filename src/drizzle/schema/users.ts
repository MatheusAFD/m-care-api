import { pgTable, varchar, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { companies, roles, employees } from '.'
import { GenreEnum } from 'src/enums'
import { timestamps } from 'src/utils'

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  companyId: varchar('company_id').notNull(),
  roleId: varchar('role_id').notNull(),
  birthday: timestamp('birthday'),
  genre: text('genre').$type<GenreEnum>(),
  ...timestamps
})

export const usersRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id]
  }),
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id]
  }),
  employee: many(employees)
}))
