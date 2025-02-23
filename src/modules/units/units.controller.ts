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

import { CreateUnitDTO, UpdateUnitDTO, GetUnitsDTO } from './dto'
import { Unit } from './entities/unit.entity'
import { UnitsService } from './units.service'

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @ApiCreatedResponse({
    description: 'Unit created successfully.'
  })
  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.COMPANY.NOT_FOUND })
  @ApiCreatedResponse({ type: Unit })
  @ApiBody({ type: CreateUnitDTO, required: true })
  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() body: CreateUnitDTO) {
    return this.unitsService.create(user.companyId, body)
  }

  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiOkResponse({ description: 'OK' })
  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Get()
  findAll(
    @Query() query: GetUnitsDTO,
    @CurrentUser() user: AuthUser
  ): Promise<ResponseWithPagination<Unit[]>> {
    return this.unitsService.findAll(user.companyId, query)
  }

  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.UNIT.NOT_FOUND })
  @ApiOkResponse({ description: 'OK' })
  @ApiParam({ name: 'id', required: true })
  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser
  ): Promise<Unit> {
    return this.unitsService.findOne(id, user.companyId)
  }

  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.UNIT.NOT_FOUND })
  @ApiBody({ type: UpdateUnitDTO, required: true })
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDTO,
    @CurrentUser() user: AuthUser
  ): Promise<Unit> {
    return this.unitsService.update(
      { id, companyId: user.companyId },
      updateUnitDto
    )
  }
}
