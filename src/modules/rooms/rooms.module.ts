import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { RoomsController } from './rooms.controller'
import { RoomsService } from './rooms.service'

@Module({
  imports: [DrizzleModule],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
