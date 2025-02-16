import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets'

import { env } from 'env'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  namespace: 'websocket/payment-events',
  cors: {
    origin: env.CORS_ALLOWED_ORIGINS
  }
})
export class PaymentsEventstGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('subscribeToCompany')
  handleEvent(
    @MessageBody() data: { companyId: string },
    @ConnectedSocket() client: Socket
  ) {
    void client.join(data.companyId)
  }

  emitCompanyActivated(companyId: string, event: string) {
    this.server.to(companyId).emit('companyActivated', { companyId, event })
  }

  emitCompanyInactivated(companyId: string, event: string) {
    this.server.to(companyId).emit('companyInactivated', { companyId, event })
  }
}
