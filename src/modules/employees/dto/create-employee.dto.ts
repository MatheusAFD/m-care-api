import { ApiProperty } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsHexColor,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

import { employees, users } from '@db/drizzle/schema'

import { DEFAULT_EMPLOYEE_COLOR } from '@common/constants'
import { GenreEnum, StatusEnum } from '@common/enums'

type CreateUserInsert = Omit<typeof users.$inferInsert, 'companyId' | 'roleId'>
type CreateEmployeeInsert = Omit<
  typeof employees.$inferInsert,
  'companyId' | 'userId'
>

type CreateUserAndEmployeeInsert = CreateUserInsert & CreateEmployeeInsert

export class CreateEmployeeDTO implements CreateUserAndEmployeeInsert {
  @ApiProperty()
  @IsString()
  unitId: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(StatusEnum)
  @Transform(({ value }) => String(value).toUpperCase())
  status: keyof typeof StatusEnum

  @IsHexColor()
  @ApiProperty()
  color: string = DEFAULT_EMPLOYEE_COLOR

  @ApiProperty()
  @IsOptional()
  @IsEnum(GenreEnum)
  @Transform(({ value }) => String(value).toUpperCase())
  genre?: keyof typeof GenreEnum | null

  @ApiProperty()
  @IsOptional()
  @IsDate()
  birthdate: string | null

  @ApiProperty()
  @IsString()
  phone: string

  @ApiProperty({ default: false })
  @IsOptional()
  isWhatsapp: boolean = false

  @ApiProperty()
  @IsString()
  address: string

  @ApiProperty()
  @IsString()
  city: string

  @ApiProperty()
  @IsString()
  neighborhood: string

  @ApiProperty()
  @IsString()
  state: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  zipcode: string

  @ApiProperty()
  @IsString()
  number: string
}
