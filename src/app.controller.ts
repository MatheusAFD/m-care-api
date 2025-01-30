import { Controller, Get } from '@nestjs/common'

import { Roles } from '@common/decorators/auth'
import { RoleEnum } from '@common/enums'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(RoleEnum.SUPER_ADMIN)
  @Get()
  getHello() {
    return this.appService.getSchema()
  }
}
