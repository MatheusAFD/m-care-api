import { relations } from 'drizzle-orm'
import { pgTable, varchar, text, boolean, date } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { users, units, companies, pgStatusEnum } from '.'

export const employees = pgTable('employees', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  status: pgStatusEnum().notNull(),
  color: text('color').notNull(),
  phone: varchar('phone', { length: 11 }).notNull(),
  isWhatsapp: boolean('is_whatsapp').default(false),
  birthdate: date('birthdate'),
  address: text('address').notNull(),
  number: text('number').notNull(),
  zipcode: varchar('zipcode', { length: 8 }).notNull(),
  neighborhood: text('neighborhood').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  userId: varchar('user_id').unique().notNull(),
  unitId: varchar('unit_id').notNull(),
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
  }),
  unit: one(units, {
    fields: [employees.unitId],
    references: [units.id]
  })
}))
