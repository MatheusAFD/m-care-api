import { pgTable, varchar, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { companies, rooms, pgStatusEnum } from '.'

import { timestamps } from 'src/common/utils'
import { createCustomId } from 'src/common/lib'

export const units = pgTable('units', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipcode: text('zipcode').notNull(),
  number: text('number').notNull(),
  companyId: varchar('company_id').notNull(),
  status: pgStatusEnum().notNull(),
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
