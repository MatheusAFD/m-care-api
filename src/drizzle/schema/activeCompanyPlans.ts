import {
  pgTable,
  varchar,
  timestamp,
  integer,
  boolean,
  uuid
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { plans, companies } from '.'
import { timestamps } from 'src/utils'

export const activeCompanyPlans = pgTable('active_company_plans', {
  id: uuid('id').primaryKey(),
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
