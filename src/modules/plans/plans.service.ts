import { Inject, Injectable } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { plans } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { StatusEnum } from '@common/enums'

import { GetPlansDTO } from './dto/get-plans.dto'

@Injectable()
export class PlansService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async findAll(query: GetPlansDTO) {
    const { status } = query

    const allPLans = await this.db
      .select()
      .from(plans)
      .where(eq(plans.status, status || StatusEnum.ACTIVE))

    return allPLans
  }
}
