import { pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users } from '.'
import { RoleEnum } from '../../enums'
import { timestamps } from 'src/utils'

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey(),
  type: text('type').$type<RoleEnum>().unique().notNull(),
  ...timestamps
})

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users)
}))
