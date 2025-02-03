import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { pgRoleEnum, users } from '.'

export const roles = pgTable('roles', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  type: pgRoleEnum().unique().notNull(),
  ...timestamps
})

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users)
}))
