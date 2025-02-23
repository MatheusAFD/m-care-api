import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

import { StatusEnum } from '@common/enums'

export class GetRoomsDTO {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value).toLocaleLowerCase().trim())
  search: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value).toUpperCase().trim())
  unitId: string

  @IsOptional()
  @Transform(({ value }) => parseInt(String(value), 10), { toClassOnly: true })
  @IsInt()
  page: number

  @IsOptional()
  @Transform(({ value }) => parseInt(String(value), 10), { toClassOnly: true })
  @IsInt()
  limit: number

  @IsOptional()
  @IsEnum(StatusEnum)
  @Transform(({ value }) => String(value).toUpperCase())
  status: keyof typeof StatusEnum
}
