import { Module } from '@nestjs/common'

import { env } from 'env'
import Stripe from 'stripe'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'

@Module({
  imports: [DrizzleModule],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    {
      provide: 'STRIPE_CLIENT',
      useFactory: () => new Stripe(env.STRIPE_SECRET_KEY, {})
    }
  ]
})
export class CompaniesModule {}
