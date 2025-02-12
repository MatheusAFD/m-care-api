import { IsEnum, IsOptional } from 'class-validator'

import { StatusEnum } from '../../../common/enums/db-enums'

export class GetPlansDTO {
  @IsOptional()
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum
}
