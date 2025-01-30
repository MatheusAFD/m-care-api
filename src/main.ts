import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { env } from 'env'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(env.NEST_API_PORT ?? 3000)
}
bootstrap()
