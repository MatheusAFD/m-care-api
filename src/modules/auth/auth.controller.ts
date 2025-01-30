import { Controller, Post, Body } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

import { Public } from '@common/decorators/auth'

import { AuthService } from './auth.service'
import { SigninDTO } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBody({ type: SigninDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 201, description: 'OK' })
  @Post('signin')
  create(@Body() { email, password }: SigninDTO) {
    return this.authService.signin({ email, password })
  }
}
