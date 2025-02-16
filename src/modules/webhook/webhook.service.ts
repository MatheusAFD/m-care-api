import { Injectable, Inject, NotFoundException } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { env } from 'env'
import Stripe from 'stripe'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { activeCompanyPlans } from '@db/drizzle/schema'
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

  async handleSuccessfulPayment(customerId: string) {
    console.log('✅ Processando pagamento:', customerId)

    const company = await this.db.query.companies.findFirst({
      with: {
        activeCompanyPlans: true
      },
      where: (company) => eq(company.stripeCustomerId, customerId)
    })

    if (!company) {
      throw new NotFoundException('Empresa não encontrada')
    }

    await this.db
      .update(activeCompanyPlans)
      .set({
        isActive: true
      })
      .where(eq(activeCompanyPlans.companyId, company.id))

    this.paymentsWebsocketService.emitCompanyActivated(company.id)

    console.log('✅ Plano atualizado com sucesso para a empresa:', company.id)
  }
}
