import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { ERROR_CONSTANTS } from '@common/constants'
import { Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'

import { CreateUnitDTO } from './dto/create-unit.dto'
import { UpdateUnitDTO } from './dto/update-unit.dto'
import { UnitsService } from './units.service'

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Roles(RoleEnum.ADMIN)
  @ApiCreatedResponse({
    description: 'Unit created successfully.'
  })
  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.COMPANY.NOT_FOUND })
  @ApiCreatedResponse()
  @ApiBody({ type: CreateUnitDTO, required: true })
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() body: CreateUnitDTO) {
    return this.unitsService.create(user.companyId, body)
  }

  @Get()
  findAll() {
    return this.unitsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDTO) {
    return this.unitsService.update(+id, updateUnitDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsService.remove(+id)
  }
}
