import { Controller, Get, Query } from '@nestjs/common'

import { Roles } from '@common/decorators/auth'
import { RoleEnum } from '@common/enums'

import { GetPlansDTO } from './dto/get-plans.dto'
import { Plan } from './entities/plan.entity'
import { PlansService } from './plans.service'

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Get()
  findAll(@Query() query: GetPlansDTO): Promise<Plan[]> {
    return this.plansService.findAll(query)
  }
}
