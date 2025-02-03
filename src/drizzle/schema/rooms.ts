import { relations } from 'drizzle-orm'
import { pgTable, varchar, text } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { units, pgStatusEnum } from '.'

export const rooms = pgTable('rooms', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  floor: text('floor').notNull(),
  status: pgStatusEnum().notNull(),
  unitId: varchar('unit_id').notNull(),
  ...timestamps
})

export const roomsRelations = relations(rooms, ({ one }) => ({
  unit: one(units, {
    fields: [rooms.unitId],
    references: [units.id]
  })
}))
