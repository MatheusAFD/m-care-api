import { relations } from 'drizzle-orm'
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  boolean,
  text
} from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { plans, companies } from './'

export const activeCompanyPlans = pgTable('active_company_plans', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  stripeSubscriptionId: text('stripe_subscription_id').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  isActive: boolean('is_active').notNull(),
  remainingDaysWithActivePlan: integer('remaining_days').notNull(),
  planId: varchar('plan_id').notNull(),
  companyId: varchar('company_id').unique().notNull(),
  ...timestamps
})

export const activeCompanyPlansRelations = relations(
  activeCompanyPlans,
  ({ one }) => ({
    plan: one(plans, {
      fields: [activeCompanyPlans.planId],
      references: [plans.id]
    }),
    company: one(companies, {
      fields: [activeCompanyPlans.companyId],
      references: [companies.id]
    })
  })
)
