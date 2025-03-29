import { relations } from 'drizzle-orm'
import { pgTable, varchar, text } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { companies, employees, roles } from './'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  companyId: varchar('company_id').notNull(),
  roleId: varchar('role_id').notNull(),
  genre: text('genre'),
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
