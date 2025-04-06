import { ApiProperty } from '@nestjs/swagger'

import { units } from '@db/drizzle/schema'

export type PlanType = typeof units.$inferSelect

export class Unit implements PlanType {
  @ApiProperty()
  number: string

  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  address: string

  @ApiProperty()
  city: string

  @ApiProperty()
  state: string

  @ApiProperty()
  zipcode: string

  @ApiProperty()
  neighborhood: string

  @ApiProperty()
  companyId: string

  @ApiProperty()
  status: 'INACTIVE' | 'ACTIVE'

  @ApiProperty()
  updatedAt: Date | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  deletedAt: Date | null
}
