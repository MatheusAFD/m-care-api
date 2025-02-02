import { Module } from '@nestjs/common'

import { env } from 'env'
import Stripe from 'stripe'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'

@Module({
  imports: [DrizzleModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: 'STRIPE_CLIENT',
      useFactory: () => new Stripe(env.STRIPE_SECRET_KEY, {})
    }
  ]
})
export class PaymentsModule {}
