import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users } from '.'

import { timestamps } from 'src/common/utils'
import { createCustomId } from 'src/common/lib'

export const roles = pgTable('roles', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  type: text('type').unique().notNull(),
  ...timestamps
})

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users)
}))
