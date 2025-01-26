import { pgTable, text, integer, boolean, decimal } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { timestamps } from 'src/common/utils'

import { activeCompanyPlans } from '.'
import { createCustomId } from 'src/common/lib'

export const plans = pgTable('plans', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  duration: integer('duration').notNull(),
  isTrial: boolean('is_trial').notNull(),
  amount: decimal('amount').notNull(),
  isFree: boolean('is_free').notNull(),
  name: text('name').notNull(),
  ...timestamps
})

export const plansRelations = relations(plans, ({ many }) => ({
  activeCompanyPlans: many(activeCompanyPlans)
}))
