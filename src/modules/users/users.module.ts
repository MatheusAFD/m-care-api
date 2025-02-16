import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
