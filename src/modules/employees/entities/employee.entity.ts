import { ApiProperty } from '@nestjs/swagger'

import { employees } from '@db/drizzle/schema'

type EmployeeSelect = typeof employees.$inferSelect

export class Employee implements EmployeeSelect {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  status: 'INACTIVE' | 'ACTIVE'

  @ApiProperty()
  color: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  companyId: string

  @ApiProperty()
  updatedAt: Date | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  deletedAt: Date | null
}
