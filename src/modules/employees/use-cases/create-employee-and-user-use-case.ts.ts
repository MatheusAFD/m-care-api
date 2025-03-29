import { Inject, InternalServerErrorException } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { employees, roles, users } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { DEFAULT_EMPLOYEE_COLOR, ERROR_CONSTANTS } from '@common/constants'
import { RoleEnum, StatusEnum } from '@common/enums'
import { encryptData } from '@common/lib'

import { CreateEmployeeDTO } from '../dto/create-employee.dto'
import { Employee } from '../entities/employee.entity'

export class CreateEmployeeAndUserUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async generateDefaultPassword({
    name,
    phone
  }: {
    name: string
    phone: string
  }): Promise<string> {
    const [firstName, lastName] = name.split(' ')
    const phoneLastFourDigits = phone.slice(-4)
    const userGeneratedPassword = `${firstName}${lastName}${phoneLastFourDigits}`

    const password = await encryptData(userGeneratedPassword)

    return password
  }

  async execute(companyId: string, body: CreateEmployeeDTO): Promise<Employee> {
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

    const hashedPassword = await this.generateDefaultPassword({ name, phone })

    const employee = await this.db.transaction(async (tx) => {
      try {
        const [user] = await tx
          .select()
          .from(users)
          .where(eq(users.email, email))

        if (user) {
          throw new InternalServerErrorException(
            ERROR_CONSTANTS.USER.ALREADY_EXISTS
          )
        }

        const [userRole] = await tx
          .select({ roleId: roles.id, type: roles.type })
          .from(roles)
          .where(eq(roles.type, RoleEnum.USER))

        const [createdUser] = await tx
          .insert(users)
          .values({
            companyId,
            email,
            name,
            password: hashedPassword,
            roleId: userRole.roleId,
            genre
          })
          .returning()

        const [employee] = await tx
          .insert(employees)
          .values({
            companyId,
            name,
            status,
            color,
            phone,
            isWhatsapp,
            birthdate,
            address,
            neighborhood,
            city,
            state,
            zipcode,
            number,
            userId: createdUser.id
          })
          .returning()

        return employee
      } catch (error) {
        throw new InternalServerErrorException(error.message)
      }
    })

    return employee
  }
}
