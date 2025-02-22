import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { UnitsController } from './units.controller'
import { UnitsService } from './units.service'

@Module({
  imports: [DrizzleModule],
  controllers: [UnitsController],
  providers: [UnitsService]
})
export class UnitsModule {}
