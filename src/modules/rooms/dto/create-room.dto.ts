import { ApiProperty } from '@nestjs/swagger'

import { IsEnum, IsOptional, IsString } from 'class-validator'

import { rooms } from '@db/drizzle/schema'

import { StatusEnum } from '@common/enums'

type createRoomInsert = typeof rooms.$inferInsert

export class CreateRoomDTO implements createRoomInsert {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  floor: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum

  @IsString()
  @ApiProperty()
  unitId: string
}
