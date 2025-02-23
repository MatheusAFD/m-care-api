import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { rooms, units } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { ERROR_CONSTANTS } from '@common/constants'
import { StatusEnum } from '@common/enums'

import { CreateRoomDTO } from './dto/create-room.dto'
import { UpdateRoomDTO } from './dto/update-room.dto'
import { Room } from './entities/room.entity'

@Injectable()
export class RoomsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async create(companyId: string, body: CreateRoomDTO): Promise<Room> {
    const { floor, name, status = StatusEnum.ACTIVE, unitId } = body

    const [unit] = await this.db
      .select({ companyId: units.companyId })
      .from(units)
      .where(eq(units.id, unitId))
      .limit(1)

    if (!unit) {
      throw new NotFoundException(ERROR_CONSTANTS.UNIT.NOT_FOUND)
    }

    if (unit.companyId !== companyId) {
      throw new ForbiddenException(ERROR_CONSTANTS.VALIDATION.CONFLICT)
    }

    const [room] = await this.db
      .insert(rooms)
      .values({
        floor,
        name,
        status,
        unitId
      })
      .returning()

    return room
  }

  findAll() {
    return `This action returns all rooms`
  }

  async findOne(id: string): Promise<Room> {
    const [room] = await this.db.select().from(rooms).where(eq(rooms.id, id))

    if (!room) {
      throw new NotFoundException(ERROR_CONSTANTS.ROOM.NOT_FOUND)
    }

    return room
  }

  async update(id: string, body: UpdateRoomDTO): Promise<Room> {
    const { name, floor, status, unitId } = body

    const room = await this.findOne(id)

    const [updatedRoom] = await this.db
      .update(rooms)
      .set({
        name: name ?? room.name,
        floor: floor ?? room.floor,
        status: status ?? room.status,
        unitId: unitId ?? room.unitId
      })
      .returning()

    return updatedRoom
  }
}
