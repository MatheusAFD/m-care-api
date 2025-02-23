import { ApiProperty } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import { IsEnum, IsOptional, IsString } from 'class-validator'

import { rooms } from '@db/drizzle/schema'

import { StatusEnum } from '@common/enums'

type createRoomInsert = typeof rooms.$inferInsert

export class CreateRoomDTO implements createRoomInsert {
  @ApiProperty()
  @IsString()
  name: string

  @IsString()
  @ApiProperty()
  floor: string

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum

  @ApiProperty()
  @IsString()
  unitId: string
}
