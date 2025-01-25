import { pgTable, varchar, text, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users, companies } from '.'
import { StatusEnum } from 'src/enums'
import { timestamps } from 'src/utils'

export const employees = pgTable('employees', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status').$type<StatusEnum>().notNull(),
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
