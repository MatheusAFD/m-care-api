import { Controller, Post, Headers, Req, Res, HttpStatus } from '@nestjs/common'

import { env } from 'env'
import { Request, Response } from 'express'
import Stripe from 'stripe'

import { Public } from '@common/decorators/auth'

import { WebhookService } from './webhook.service'

@Controller('webhook')
export class WebhookController {
  private stripe: Stripe

  constructor(private readonly webhookService: WebhookService) {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY)
  }

  @Public()
  @Post()
  async handleStripeWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string
  ) {
    const endpointSecret = env.STRIPE_WEBHOOK_SECRET || ''
    if (!endpointSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined')
    }

    let event: Stripe.Event

    try {
      event = this.stripe.webhooks.constructEvent(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        req.body,
        signature,
        endpointSecret
      )
    } catch (err) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        await this.webhookService.handleSuccessfulPayment(
          String(paymentIntent.customer),
          event.type
        )
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        await this.webhookService.handlePaymentFailed(
          String(paymentIntent.customer),
          event.type
        )
        break
      }

      default:
        console.log(`unknow event: ${event.type}`)
    }

    return res.json({ received: true })
  }
}
