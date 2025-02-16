import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'
import { PaymentsEventstGateway } from '@modules/websocket/payments-events/payments-events.gateway'
import { PaymentsEventsModule } from '@modules/websocket/payments-events/payments-events.module'
import { PaymentsEventsService } from '@modules/websocket/payments-events/payments-events.service'

import { WebhookController } from './webhook.controller'
import { WebhookService } from './webhook.service'

@Module({
  imports: [DrizzleModule, PaymentsEventsModule],
  controllers: [WebhookController],
  providers: [WebhookService, PaymentsEventsService, PaymentsEventstGateway]
})
export class WebhookModule {}
