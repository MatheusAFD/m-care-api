import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { and, eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { employees } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { ERROR_CONSTANTS } from '@common/constants'

import { UpdateEmployeeDTO } from './dto/update-employee.dto'
import { Employee } from './entities/employee.entity'

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  findAll() {
    return `This action returns all employees`
  }

  async findOne(companyId: string, id: string): Promise<Employee> {
    const [employee] = await this.db
      .select()
      .from(employees)
      .where(and(eq(employees.id, id), eq(employees.companyId, companyId)))
      .limit(1)

    if (!employee) {
      throw new NotFoundException(ERROR_CONSTANTS.EMPLOYEE.NOT_FOUND)
    }

    return employee
  }

  update(id: string, body: UpdateEmployeeDTO) {
    return `This action updates a #${id} employee ${body}`
  }
}
