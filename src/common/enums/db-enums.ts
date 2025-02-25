import { pgEnum } from 'drizzle-orm/pg-core'

import { z } from 'zod'

export const pgRoleEnum = pgEnum('role', ['USER', 'ADMIN', 'SUPER_ADMIN'])
export const pgStatusEnum = pgEnum('status', ['INACTIVE', 'ACTIVE'])
export const pgGenreEnum = pgEnum('genre', ['MALE', 'FEMALE', 'OTHER'])

export const RoleEnum = z.enum(pgRoleEnum.enumValues).Enum
export const StatusEnum = z.enum(pgStatusEnum.enumValues).Enum
export const GenreEnum = z.enum(pgGenreEnum.enumValues).Enum
