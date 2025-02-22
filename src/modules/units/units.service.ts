import {
  Inject,
  Injectable,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { companies, units } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { ERROR_CONSTANTS } from '@common/constants'

import { CreateUnitDTO } from './dto/create-unit.dto'
import { UpdateUnitDTO } from './dto/update-unit.dto'

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

  findOne(id: number) {
    return `This action returns a #${id} unit`
  }

  update(id: number, body: UpdateUnitDTO) {
    return `This action updates a #${id} unit ${body}`
  }

  remove(id: number) {
    return `This action removes a #${id} unit`
  }
}
