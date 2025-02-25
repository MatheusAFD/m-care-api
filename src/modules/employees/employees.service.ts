import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { and, count, desc, eq, ilike } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { employees } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { ERROR_CONSTANTS } from '@common/constants'
import { StatusEnum } from '@common/enums'
import { ResponseWithPagination } from '@common/types'
import { calculatePagination, calculateQueryOffset } from '@common/utils'

import { GetEmployeesDTO } from './dto/get-employee.dto'
import { UpdateEmployeeDTO } from './dto/update-employee.dto'
import { Employee } from './entities/employee.entity'

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async findAll(
    companyId: string,
    filters: GetEmployeesDTO
  ): Promise<ResponseWithPagination<Employee[]>> {
    const { search = '', limit, page, status = StatusEnum.ACTIVE } = filters

    const [{ count: totalItems }] = await this.db
      .select({ count: count() })
      .from(employees)
      .where(
        and(
          eq(employees.companyId, companyId),
          eq(employees.status, status),
          ilike(employees.name, `%${search}%`)
        )
      )

    const data = await this.db
      .select()
      .from(employees)
      .where(
        and(
          eq(employees.companyId, companyId),
          eq(employees.status, status),
          ilike(employees.name, `%${search}%`)
        )
      )
      .orderBy(desc(employees.createdAt))
      .offset(calculateQueryOffset(page, limit))
      .limit(limit)

    const pagination = calculatePagination({
      limit,
      page,
      totalItems
    })

    return { data, pagination }
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

  async update(
    { id, companyId }: { id: string; companyId: string },
    body: UpdateEmployeeDTO
  ): Promise<Employee> {
    const { name, status, color } = body

    const employee = await this.findOne(companyId, id)

    const [updatedEmployee] = await this.db
      .update(employees)
      .set({
        name: name ?? employee.name,
        color: color ?? employee.color,
        status: status ?? employee.status
      })
      .where(and(eq(employees.id, id), eq(employees.companyId, companyId)))
      .returning()

    if (!updatedEmployee) {
      throw new InternalServerErrorException(
        ERROR_CONSTANTS.EMPLOYEE.UPDATE_FAILED
      )
    }

    return updatedEmployee
  }
}
