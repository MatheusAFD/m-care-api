import { Inject, Injectable } from '@nestjs/common'

import { eq, getTableColumns } from 'drizzle-orm'

import { DrizzleAsyncProvider } from './drizzle/drizzle.provider'
import { roles, users } from './drizzle/schema'
import { DrizzleSchema } from './drizzle/types'

@Injectable()
export class AppService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: DrizzleSchema
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  async getSchema() {
    const data = await this.db
      .select({
        ...getTableColumns(users),
        roles: {
          id: roles.id,
          type: roles.type
        }
      })
      .from(users)
      .leftJoin(roles, eq(users.roleId, roles.id))

    return data
  }
}
