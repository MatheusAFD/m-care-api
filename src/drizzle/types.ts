import { NodePgDatabase } from 'drizzle-orm/node-postgres'

import * as schema from './schema'

export type DrizzleSchema = NodePgDatabase<typeof schema>
