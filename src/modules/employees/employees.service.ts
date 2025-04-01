import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { and, count, desc, eq, getTableColumns, ilike } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { employees, users } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { DEFAULT_EMPLOYEE_COLOR, ERROR_CONSTANTS } from '@common/constants'
import { StatusEnum } from '@common/enums'
import { ResponseWithPagination } from '@common/types'
import { calculatePagination, calculateQueryOffset } from '@common/utils'

import { GetEmployeesDTO } from './dto/get-employee.dto'
import { UpdateEmployeeDTO } from './dto/update-employee.dto'
import { Employee } from './entities/employee.entity'
import { GetOneEmployeeResponse } from './types'

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

  async findOne(
    companyId: string,
    id: string
  ): Promise<GetOneEmployeeResponse> {
    const [employee] = await this.db
      .select({
        ...getTableColumns(employees),
        email: users.email,
        genre: users.genre
      })
      .from(employees)
      .where(and(eq(employees.id, id), eq(employees.companyId, companyId)))
      .innerJoin(users, eq(employees.userId, users.id))
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
    const {
      name,
      email,
      phone,
      isWhatsapp = false,
      status = StatusEnum.ACTIVE,
      color = DEFAULT_EMPLOYEE_COLOR,
      birthdate,
      genre,
      address,
      neighborhood,
      city,
      state,
      zipcode,
      number
    } = body

    const response = await this.db.transaction(async (trx) => {
      const employee = await this.findOne(companyId, id)

      const [updatedEmployee] = await trx
        .update(employees)
        .set({
          name: name ?? employee.name,
          color: color ?? employee.color,
          status: status ?? employee.status,
          address: address ?? employee.address,
          neighborhood: neighborhood ?? employee.neighborhood,
          city: city ?? employee.city,
          state: state ?? employee.state,
          zipcode: zipcode ?? employee.zipcode,
          number: number ?? employee.number,
          phone: phone ?? employee.phone,
          isWhatsapp: isWhatsapp ?? employee.isWhatsapp,
          birthdate: birthdate ?? employee.birthdate
        })
        .where(and(eq(employees.id, id), eq(employees.companyId, companyId)))
        .returning()

      const [updatedUser] = await trx
        .update(users)
        .set({
          email: email ?? employee.email,
          genre: genre ?? employee.genre
        })
        .where(eq(users.id, employee.userId))
        .returning()

      if (!updatedEmployee) {
        throw new InternalServerErrorException(
          ERROR_CONSTANTS.EMPLOYEE.UPDATE_FAILED
        )
      }

      return {
        ...updatedEmployee,
        genre: updatedUser.genre,
        email: updatedUser.email
      }
    })

    return response
  }
}
