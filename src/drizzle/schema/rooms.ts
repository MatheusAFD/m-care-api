import { pgTable, varchar, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { units } from '.'

import { timestamps } from 'src/common/utils'
import { createCustomId } from 'src/common/lib'
import { pgStatusEnum } from 'src/enums'

export const rooms = pgTable('rooms', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  floor: text('floor').notNull(),
  unitId: varchar('unit_id').notNull(),
  status: pgStatusEnum().notNull(),
  ...timestamps
})

export const roomsRelations = relations(rooms, ({ one }) => ({
  unit: one(units, {
    fields: [rooms.unitId],
    references: [units.id]
  })
}))
