import { Controller, Post, Body } from '@nestjs/common'

import { Public } from '@common/decorators/auth'

import { AuthService } from './auth.service'
import { SigninDTO } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  create(@Body() { email, password }: SigninDTO) {
    return this.authService.signin({ email, password })
  }
}
