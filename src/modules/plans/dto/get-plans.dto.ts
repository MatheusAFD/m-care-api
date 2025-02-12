import { Transform } from 'class-transformer'
import { IsEnum, IsOptional } from 'class-validator'

import { StatusEnum } from '../../../common/enums/db-enums'
export class GetPlansDTO {
  @IsOptional()
  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum
}
