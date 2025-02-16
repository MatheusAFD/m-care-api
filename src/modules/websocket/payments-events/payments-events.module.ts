import { Module } from '@nestjs/common'

import { PaymentsEventstGateway } from './payments-events.gateway'
import { PaymentsEventsService } from './payments-events.service'

@Module({
  providers: [PaymentsEventstGateway, PaymentsEventsService]
})
export class PaymentsEventsModule {}
