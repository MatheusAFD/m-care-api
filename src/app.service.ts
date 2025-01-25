import { Inject, Injectable } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { DrizzleAsyncProvider } from './drizzle/drizzle.provider'
import * as schema from './drizzle/schema/users'

@Injectable()
export class AppService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  async getSchema() {
    const data = await this.db.query.users.findMany({})

    return data
  }
}
