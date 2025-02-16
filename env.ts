import { z } from 'zod'

const envSchema = z.object({
  NEST_API_PORT: z.coerce.number().min(1000),
  CORS_ALLOWED_ORIGINS: z.array(z.string()),
  USER_FROM_SEED_PASSWORD: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  JWT_SECRET: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string().url()
})

export const env = envSchema.parse({
  ...process.env,
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS?.split(',')
})
