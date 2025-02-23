import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { CurrentUser } from '@common/decorators/user'

import { CreateRoomDTO, UpdateRoomDTO } from './dto'
import { RoomsService } from './rooms.service'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() body: CreateRoomDTO, @CurrentUser() user: AuthUser) {
    return this.roomsService.create(user.companyId, body)
  }

  @Get()
  findAll() {
    return this.roomsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDTO) {
    return this.roomsService.update(+id, updateRoomDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id)
  }
}
