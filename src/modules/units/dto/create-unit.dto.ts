import { ApiProperty } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

import { units } from '@db/drizzle/schema'

import { StatusEnum } from '@common/enums'

export type createUnit = Omit<typeof units.$inferInsert, 'companyId'>

export class CreateUnitDTO implements createUnit {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  phone: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  number: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  neighborhood: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  zipcode: string

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum
}
