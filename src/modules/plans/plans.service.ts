import { Inject, Injectable } from '@nestjs/common'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { plans } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

@Injectable()
export class PlansService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async findAll() {
    const allPLans = await this.db.select().from(plans)

    return allPLans
  }
}
