import { relations } from 'drizzle-orm'
import { pgTable, text, boolean } from 'drizzle-orm/pg-core'

import { createCustomId } from 'src/common/lib'
import { timestamps } from 'src/common/utils'

import { units, users, employees, activeCompanyPlans, rooms } from './'

export const companies = pgTable('companies', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  cnpj: text('cnpj').unique().notNull(),
  cpf: text('cpf').unique(),
  isActive: boolean('is_active').notNull(),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  ...timestamps
})

export const companiesRelations = relations(companies, ({ many, one }) => ({
  users: many(users),
  activeCompanyPlans: one(activeCompanyPlans),
  employees: many(employees),
  units: many(units),
  rooms: many(rooms)
}))
