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

  emitPaymentStatus(companyId: string, event: string) {
    this.server.to(companyId).emit('payment-status', { companyId, event })
  }
}
