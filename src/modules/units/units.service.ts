import {
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common'

import { and, eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { companies, units } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { ERROR_CONSTANTS } from '@common/constants'

import { CreateUnitDTO } from './dto/create-unit.dto'
import { UpdateUnitDTO } from './dto/update-unit.dto'
import { Unit } from './entities/unit.entity'

@Injectable()
export class UnitsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async create(companyId: string, body: CreateUnitDTO) {
    const { name, address, city, number, state, status, zipcode } = body

    const [company] = await this.db
      .select()
      .from(companies)
      .where(eq(companies.id, companyId))
      .limit(1)

    if (!company) {
      throw new NotFoundException(ERROR_CONSTANTS.COMPANY.NOT_FOUND)
    }

    try {
      await this.db.insert(units).values({
        address,
        city,
        companyId: company.id,
        name,
        number,
        state,
        status,
        zipcode
      })

      return { success: true }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  findAll() {
    return `This action returns all units`
  }

  async findOne(unitId: string, companyId: string): Promise<Unit> {
    const [unit] = await this.db
      .select()
      .from(units)
      .where(and(eq(units.id, unitId), eq(units.companyId, companyId)))
      .limit(1)

    if (!unit) {
      throw new NotFoundException(ERROR_CONSTANTS.UNIT.NOT_FOUND)
    }

    return unit
  }

  async update(
    { id, companyId }: { id: string; companyId: string },
    body: UpdateUnitDTO
  ): Promise<Unit> {
    const { name, status, address, number, city, state, zipcode } = body

    const unit = await this.findOne(id, companyId)

    const [updatedUnit] = await this.db
      .update(units)
      .set({
        name: name ?? unit.name,
        status: status ?? unit.status,
        address: address ?? unit.address,
        number: number ?? unit.number,
        city: city ?? unit.city,
        state: state ?? unit.state,
        zipcode: zipcode ?? unit.zipcode
      })
      .where(eq(units.id, unit.id))
      .returning()

    if (!updatedUnit) {
      throw new InternalServerErrorException(ERROR_CONSTANTS.UNIT.UPDATE_FAILED)
    }

    return updatedUnit
  }

  remove(id: number) {
    return `This action removes a #${id} unit`
  }
}
