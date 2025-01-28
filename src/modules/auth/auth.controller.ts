import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninDTO } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  create(@Body() { email, password }: SigninDTO) {
    return this.authService.signin({ email, password })
  }
}
