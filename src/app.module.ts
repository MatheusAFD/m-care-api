import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { AuthModule } from '@modules/auth/auth.module'
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard'
import { RolesGuard } from '@modules/auth/role.guard'
import { CompaniesModule } from '@modules/companies/companies.module'
import { DrizzleModule } from '@modules/drizzle/drizzle.module'
import { PaymentsModule } from '@modules/payments/payments.module'
import { PlansModule } from '@modules/plans/plans.module'
import { UnitsModule } from '@modules/units/units.module'
import { UsersModule } from '@modules/users/users.module'
import { WebhookModule } from '@modules/webhook/webhook.module'
import { PaymentsEventsModule } from '@modules/websocket/payments-events/payments-events.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PaymentsModule,
    CompaniesModule,
    PlansModule,
    WebhookModule,
    PaymentsEventsModule,
    UsersModule,
    UnitsModule,
    RoomsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
