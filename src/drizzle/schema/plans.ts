import { relations } from 'drizzle-orm'
import { pgTable, text, integer, boolean, numeric } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { activeCompanyPlans } from '.'

export const plans = pgTable('plans', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  amount: numeric('amount').notNull(),
  duration: integer('duration').notNull(),
  isTrial: boolean('is_trial').notNull(),
  isFree: boolean('is_free').notNull(),
  stripePriceId: text('stripe_price_id'),
  stripeProductId: text('stripe_product_id'),
  ...timestamps
})

export const plansRelations = relations(plans, ({ many }) => ({
  activeCompanyPlans: many(activeCompanyPlans)
}))
