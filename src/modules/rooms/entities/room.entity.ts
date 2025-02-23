import { ApiProperty } from '@nestjs/swagger'

import { rooms } from '@db/drizzle/schema'

export type RoomType = typeof rooms.$inferSelect

export class Room implements RoomType {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  floor: string

  @ApiProperty()
  status: 'INACTIVE' | 'ACTIVE'

  @ApiProperty()
  unitId: string

  @ApiProperty()
  companyId: string

  @ApiProperty()
  updatedAt: Date | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  deletedAt: Date | null
}
