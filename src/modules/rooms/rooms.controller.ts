import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam
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

  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.UNIT.NOT_FOUND })
  @ApiCreatedResponse({ type: Room })
  @ApiBody({ type: CreateRoomDTO, required: true })
  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() body: CreateRoomDTO, @CurrentUser() user: AuthUser) {
    return this.roomsService.create(user.companyId, body)
  }

  @Get()
  findAll() {
    return this.roomsService.findAll()
  }

  @ApiNotFoundResponse({ description: ERROR_CONSTANTS.ROOM.NOT_FOUND })
  @ApiOkResponse({ description: 'OK' })
  @ApiParam({ name: 'id', required: true })
  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDTO) {
    return this.roomsService.update(+id, updateRoomDto)
  }
}
