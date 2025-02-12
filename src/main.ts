import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { env } from 'env'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('m-care')
    .setDescription('API')
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  await app.listen(env.NEST_API_PORT ?? 4000)
}
bootstrap()
