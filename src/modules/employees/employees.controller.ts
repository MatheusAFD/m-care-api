import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { ERROR_CONSTANTS } from '@common/constants'
import { Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'
import { ResponseWithPagination } from '@common/types'

import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto'
import { GetEmployeesDTO } from './dto/get-employee.dto'
import { EmployeesService } from './employees.service'
import { Employee } from './entities/employee.entity'
import { GetOneEmployeeResponse } from './types'
import { CreateEmployeeAndUserUseCase } from './use-cases'

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly createEmployeeAndUserUseCase: CreateEmployeeAndUserUseCase
  ) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiCreatedResponse({ type: Employee })
  @ApiBody({ type: CreateEmployeeDTO, required: true })
  create(
    @Body() body: CreateEmployeeDTO,
    @CurrentUser() user: AuthUser
  ): Promise<Employee> {
    return this.createEmployeeAndUserUseCase.execute(user.companyId, body)
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiOkResponse({ type: Employee, isArray: true })
  findAll(
    @Query() filters: GetEmployeesDTO,
    @CurrentUser() user: AuthUser
  ): Promise<ResponseWithPagination<Employee[]>> {
    return this.employeesService.findAll(user.companyId, filters)
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.EMPLOYEE.NOT_FOUND })
  @ApiOkResponse({ type: Employee })
  @ApiParam({ name: 'id', required: true })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser
  ): Promise<GetOneEmployeeResponse> {
    return this.employeesService.findOne(user.companyId, id)
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.EMPLOYEE.NOT_FOUND })
  @ApiOkResponse({ type: Employee })
  update(
    @Param('id') id: string,
    @Body() body: UpdateEmployeeDTO,
    @CurrentUser() user: AuthUser
  ): Promise<Employee> {
    return this.employeesService.update({ id, companyId: user.companyId }, body)
  }
}
