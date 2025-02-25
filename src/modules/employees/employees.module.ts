import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { EmployeesController } from './employees.controller'
import { EmployeesService } from './employees.service'
import { CreateEmployeeAndUserUseCase } from './use-cases/create-employee-and-user-use-case.ts'

@Module({
  imports: [DrizzleModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, CreateEmployeeAndUserUseCase]
})
export class EmployeesModule {}
