import { Injectable } from '@nestjs/common'

import { PaymentsEventstGateway } from './payments-events.gateway'

@Injectable()
export class PaymentsEventsService {
  constructor(private readonly gateway: PaymentsEventstGateway) {}

  emitPaymentStatus(companyId: string, event: string) {
    this.gateway.emitPaymentStatus(companyId, event)
  }
}
