import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { PlansController } from './plans.controller'
import { PlansService } from './plans.service'

@Module({
  imports: [DrizzleModule],
  controllers: [PlansController],
  providers: [PlansService]
})
export class PlansModule {}
