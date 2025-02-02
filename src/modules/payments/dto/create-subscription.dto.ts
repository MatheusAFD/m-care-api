import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSubscriptionDTO {
  @IsString()
  @IsNotEmpty()
  companyId: string

  @IsString()
  @IsNotEmpty()
  paymentMethodId: string
  @IsString()
  @IsNotEmpty()
  planId: string
}
