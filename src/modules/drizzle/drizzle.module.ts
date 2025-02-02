import { Module } from '@nestjs/common'

import {
  DrizzleAsyncProvider,
  drizzleProvider
} from 'src/drizzle/drizzle.provider'

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider]
})
export class DrizzleModule {}
