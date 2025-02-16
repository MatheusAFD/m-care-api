import { Injectable } from '@nestjs/common'

import { PaymentsEventstGateway } from './payments-events.gateway'

@Injectable()
export class PaymentsEventsService {
  constructor(private readonly gateway: PaymentsEventstGateway) {}

  emitCompanyActivated(companyId: string) {
    this.gateway.emitCompanyActivated(companyId)
  }
}
