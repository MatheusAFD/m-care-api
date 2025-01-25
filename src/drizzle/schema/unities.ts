import { pgTable, varchar, text, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { companies, rooms } from '.'
import { StatusEnum } from 'src/enums'
import { timestamps } from 'src/utils'

export const units = pgTable('units', {
  id: uuid('id').primaryKey(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipcode: text('zipcode').notNull(),
  number: text('number').notNull(),
  companyId: varchar('company_id').notNull(),
  status: text('status').$type<StatusEnum>().notNull(),
  name: text('name').notNull(),
  ...timestamps
})

export const unitsRelations = relations(units, ({ one, many }) => ({
  company: one(companies, {
    fields: [units.companyId],
    references: [companies.id]
  }),
  rooms: many(rooms)
}))
