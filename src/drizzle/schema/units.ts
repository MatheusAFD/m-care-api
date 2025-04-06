import { relations } from 'drizzle-orm'
import { pgTable, varchar, text } from 'drizzle-orm/pg-core'

import { StatusEnum } from '@common/enums'
import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { companies, rooms, pgStatusEnum, employees } from '.'

export const units = pgTable('units', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  phone: varchar('phone', { length: 11 }).notNull(),
  address: text('address').notNull(),
  number: text('number').notNull(),
  zipcode: varchar('zipcode', { length: 8 }).notNull(),
  neighborhood: text('neighborhood').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  companyId: varchar('company_id').notNull(),
  status: pgStatusEnum().notNull().default(StatusEnum.ACTIVE),
  ...timestamps
})

export const unitsRelations = relations(units, ({ one, many }) => ({
  company: one(companies, {
    fields: [units.companyId],
    references: [companies.id]
  }),
  rooms: many(rooms),
  employees: many(employees)
}))
