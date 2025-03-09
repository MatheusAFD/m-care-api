import { Controller, Post, Body } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

import { Public } from '@common/decorators/auth'

import { AuthService } from './auth.service'
import { SigninDTO, RefreshTokenDTO } from './dto/'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBody({ type: SigninDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 201, description: 'OK' })
  @Post('sign-in')
  create(@Body() { email, password }: SigninDTO) {
    return this.authService.signin({ email, password })
  }

  @Public()
  @Post('refresh-token')
  @ApiBody({ type: RefreshTokenDTO })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  @ApiResponse({ status: 201, description: 'OK' })
  refreshToken(@Body() { refreshToken }: RefreshTokenDTO) {
    return this.authService.refreshToken({ refreshToken })
  }
}
