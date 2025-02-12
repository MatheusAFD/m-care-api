import { Controller, Get } from '@nestjs/common'

import { Roles } from '@common/decorators/auth'
import { RoleEnum } from '@common/enums'

import { PlansService } from './plans.service'

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Get()
  findAll() {
    return this.plansService.findAll()
  }
}
