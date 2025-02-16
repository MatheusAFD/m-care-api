import { Injectable } from '@nestjs/common'

import { PaymentsEventstGateway } from './payments-events.gateway'

@Injectable()
export class PaymentsEventsService {
  constructor(private readonly gateway: PaymentsEventstGateway) {}

  emitPaymentSuccessful(companyId: string, event: string) {
    this.gateway.emitCompanyActivated(companyId, event)
  }

  emitPaymentFailed(companyId: string, event: string) {
    this.gateway.emitCompanyInactivated(companyId, event)
  }
}
