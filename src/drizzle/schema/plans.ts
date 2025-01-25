import {
  pgTable,
  text,
  integer,
  boolean,
  numeric,
  uuid
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { activeCompanyPlans } from '.'
import { timestamps } from 'src/utils'

export const plans = pgTable('plans', {
  id: uuid('id').primaryKey(),
  duration: integer('duration').notNull(),
  isTrial: boolean('is_trial').notNull(),
  amount: numeric('amount').notNull(),
  isFree: boolean('is_free').notNull(),
  name: text('name').notNull(),
  ...timestamps
})

export const plansRelations = relations(plans, ({ many }) => ({
  activeCompanyPlans: many(activeCompanyPlans)
}))
