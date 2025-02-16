import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'

import { eq } from 'drizzle-orm'

import Stripe from 'stripe'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { activeCompanyPlans, companies, plans } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { CreateSubscriptionDTO } from './dto/create-subscription.dto'

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    @Inject('STRIPE_CLIENT')
    private stripe: Stripe
  ) {}

  private async attachPaymentMethod(
    stripeCustomerId: string,
    paymentMethodId: string
  ) {
    await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripeCustomerId
    })

    await this.stripe.customers.update(stripeCustomerId, {
      invoice_settings: { default_payment_method: paymentMethodId }
    })

    return { success: true }
  }

  async createSubscription({
    paymentMethodId,
    companyId,
    planId
  }: CreateSubscriptionDTO) {
    const [company] = await this.db
      .select({
        id: companies.id,
        stripeCustomerId: companies.stripeCustomerId
      })
      .from(companies)
      .where(eq(companies.id, companyId))
      .limit(1)

    if (!company) {
      throw new NotFoundException('company not found')
    }

    const [plan] = await this.db
      .select({
        id: plans.id,
        stripePriceId: plans.stripePriceId
      })
      .from(plans)
      .where(eq(plans.id, planId))
      .limit(1)

    if (!plan || !plan.stripePriceId) {
      throw new ForbiddenException(
        'invalid plan or plan does not have a stripe price id'
      )
    }

    try {
      await this.attachPaymentMethod(company.stripeCustomerId, paymentMethodId)

      const subscription = await this.stripe.subscriptions.create({
        customer: company.stripeCustomerId,
        items: [{ price: plan.stripePriceId }],
        expand: ['latest_invoice.payment_intent']
      })

      const startDate = new Date(subscription.current_period_start * 1000)
      const endDate = new Date(subscription.current_period_end * 1000)
      const remainingDays = Math.ceil(
        (endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )

      await this.db.insert(activeCompanyPlans).values({
        stripeSubscriptionId: subscription.id,
        companyId: company.id,
        planId,
        startDate,
        endDate,
        isActive: false,
        remainingDaysWithActivePlan: remainingDays
      })

      return { success: true }
    } catch (error) {
      return error
    }
  }
}
