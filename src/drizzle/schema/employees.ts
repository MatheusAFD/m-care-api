import { pgTable, varchar, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users, companies, pgStatusEnum } from '.'

import { createCustomId } from 'src/common/lib'
import { timestamps } from 'src/common/utils'

export const employees = pgTable('employees', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  status: pgStatusEnum().notNull(),
  color: text('color').notNull(),
  userId: varchar('user_id').unique().notNull(),
  companyId: varchar('company_id').notNull(),
  ...timestamps
})

export const employeesRelations = relations(employees, ({ one }) => ({
  user: one(users, {
    fields: [employees.userId],
    references: [users.id]
  }),
  company: one(companies, {
    fields: [employees.companyId],
    references: [companies.id]
  })
}))
