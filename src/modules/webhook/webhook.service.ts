import { Injectable, Inject, NotFoundException } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { env } from 'env'
import Stripe from 'stripe'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { activeCompanyPlans, companies } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { PaymentsEventsService } from '@modules/websocket/payments-events/payments-events.service'

@Injectable()
export class WebhookService {
  private stripe: Stripe

  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: DrizzleSchema,
    private readonly paymentsWebsocketService: PaymentsEventsService
  ) {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY)
  }

  async handleSuccessfulPayment(customerId: string, event: string) {
    const company = await this.db.query.companies.findFirst({
      with: {
        activeCompanyPlans: true
      },
      where: (company) => eq(company.stripeCustomerId, customerId)
    })

    if (!company) {
      throw new NotFoundException('company not found')
    }

    await this.db.transaction(async (tx) => {
      await tx
        .update(companies)
        .set({
          isActive: true
        })
        .where(eq(companies.id, company.id))

      await tx
        .update(activeCompanyPlans)
        .set({
          isActive: true
        })
        .where(eq(activeCompanyPlans.companyId, company.id))
    })

    this.paymentsWebsocketService.emitPaymentStatus(company.id, event)
  }

  async handlePaymentFailed(customerId: string, event: string) {
    const company = await this.db.query.companies.findFirst({
      with: {
        activeCompanyPlans: true
      },
      where: (company) => eq(company.stripeCustomerId, customerId)
    })

    if (!company) {
      throw new NotFoundException('company not found')
    }

    await this.db.transaction(async (tx) => {
      await tx
        .update(companies)
        .set({
          isActive: false
        })
        .where(eq(companies.id, company.id))

      await tx
        .update(activeCompanyPlans)
        .set({
          isActive: false
        })
        .where(eq(activeCompanyPlans.companyId, company.id))
    })

    this.paymentsWebsocketService.emitPaymentStatus(company.id, event)
  }
}
