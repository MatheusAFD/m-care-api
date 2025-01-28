import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { DrizzleModule } from '../drizzle/drizzle.module'

@Module({
  imports: [DrizzleModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
