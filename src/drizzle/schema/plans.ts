import { relations } from 'drizzle-orm'
import { pgTable, text, integer, boolean, numeric } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { activeCompanyPlans, pgStatusEnum } from '.'

export const plans = pgTable('plans', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: numeric('price').notNull(),
  status: pgStatusEnum().notNull(),
  duration: integer('duration').notNull(),
  isRecommended: boolean('is_recommended').notNull().default(false),
  isTrial: boolean('is_trial').notNull(),
  isFree: boolean('is_free').notNull(),
  stripePriceId: text('stripe_price_id'),
  stripeProductId: text('stripe_product_id'),
  ...timestamps
})

export const plansRelations = relations(plans, ({ many }) => ({
  activeCompanyPlans: many(activeCompanyPlans)
}))
