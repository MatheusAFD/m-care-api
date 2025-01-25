import { pgTable, text, boolean, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { units, users, employees } from '.'
import { timestamps } from 'src/utils'

export const companies = pgTable('companies', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  cnpj: text('cnpj'),
  cpf: text('cpf'),
  isActive: boolean('is_active').notNull(),
  ...timestamps
})

export const companiesRelations = relations(companies, ({ many }) => ({
  units: many(units),
  users: many(users),
  employees: many(employees)
}))
