import { ApiProperty } from '@nestjs/swagger'

import { employees } from '@db/drizzle/schema'

type EmployeeSelect = typeof employees.$inferSelect

export class Employee implements EmployeeSelect {
  @ApiProperty()
  unitId: string

  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  status: 'INACTIVE' | 'ACTIVE'

  @ApiProperty()
  birthdate: string | null

  @ApiProperty()
  color: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  companyId: string

  @ApiProperty()
  neighborhood: string

  @ApiProperty()
  number: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  isWhatsapp: boolean | null

  @ApiProperty()
  address: string

  @ApiProperty()
  zipcode: string

  @ApiProperty()
  city: string

  @ApiProperty()
  state: string

  @ApiProperty({ type: Date })
  updatedAt: Date | null

  @ApiProperty({ type: Date })
  createdAt: Date

  @ApiProperty({ type: Date })
  deletedAt: Date | null
}
