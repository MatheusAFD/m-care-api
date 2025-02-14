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

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PaymentsModule,
    CompaniesModule,
    PlansModule
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
