import { Controller, Get, Query } from '@nestjs/common'

import { Roles } from '@common/decorators/auth'
import { RoleEnum } from '@common/enums'

import { PlansService } from './plans.service'
import { GetPlansDTO } from './dto/get-plans.dto'

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Get()
  findAll(@Query() query: GetPlansDTO) {
    return this.plansService.findAll(query)
  }
}
