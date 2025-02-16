import { Controller, Get } from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { CurrentUser } from '@common/decorators/user/current-user.decorator'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-me')
  currentUser(@CurrentUser() user: AuthUser) {
    return this.usersService.getMe(user.id)
  }
}
