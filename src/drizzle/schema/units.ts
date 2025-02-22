import { relations } from 'drizzle-orm'
import { pgTable, varchar, text } from 'drizzle-orm/pg-core'

import { StatusEnum } from '@common/enums'
import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { companies, rooms, pgStatusEnum } from '.'

export const units = pgTable('units', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipcode: text('zipcode').notNull(),
  number: text('number').notNull(),
  companyId: varchar('company_id').notNull(),
  status: pgStatusEnum().notNull().default(StatusEnum.ACTIVE),
  ...timestamps
})

export const unitsRelations = relations(units, ({ one, many }) => ({
  company: one(companies, {
    fields: [units.companyId],
    references: [companies.id]
  }),
  rooms: many(rooms)
}))
