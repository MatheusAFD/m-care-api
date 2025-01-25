import { pgTable, varchar, text, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { units } from '.'
import { StatusEnum } from 'src/enums'
import { timestamps } from 'src/utils'

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  floor: text('floor').notNull(),
  unitId: varchar('unit_id').notNull(),
  status: text('status').$type<StatusEnum>().notNull(),
  ...timestamps
})

export const roomsRelations = relations(rooms, ({ one }) => ({
  unit: one(units, {
    fields: [rooms.unitId],
    references: [units.id]
  })
}))
