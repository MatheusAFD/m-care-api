import { Body, Controller, Post } from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'

import { CreateSubscriptionDTO } from './dto/create-subscription.dto'
import { PaymentsService } from './payments.service'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles(RoleEnum.SUPER_ADMIN)
  @Post('create-subscription')
  async createSubscription(
    @Body() body: Omit<CreateSubscriptionDTO, 'companyId'>,
    @CurrentUser() user: AuthUser
  ) {
    return this.paymentsService.createSubscription({
      ...body,
      companyId: user.companyId
    })
  }
}
