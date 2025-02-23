import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'
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

import { CreateRoomDTO, UpdateRoomDTO } from './dto'
import { Room } from './entities/room.entity'
import { RoomsService } from './rooms.service'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.UNIT.NOT_FOUND })
  @ApiCreatedResponse({ type: Room })
  @ApiBody({ type: CreateRoomDTO, required: true })
  @Roles(RoleEnum.ADMIN)
  @Post()
  create(
    @Body() body: CreateRoomDTO,
    @CurrentUser() user: AuthUser
  ): Promise<Room> {
    return this.roomsService.create(user.companyId, body)
  }

  @Get()
  findAll() {
    return this.roomsService.findAll()
  }

  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.ROOM.NOT_FOUND })
  @ApiOkResponse({ description: 'OK' })
  @ApiParam({ name: 'id', required: true })
  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Room> {
    return this.roomsService.findOne(id)
  }

  @ApiBadRequestResponse({ description: ERROR_CONSTANTS.VALIDATION.DEFAULT })
  @ApiUnauthorizedResponse({
    description: ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
  })
  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.ROOM.NOT_FOUND })
  @ApiBody({ type: UpdateRoomDTO, required: true })
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateRoomDTO): Promise<Room> {
    return this.roomsService.update(id, body)
  }
}
