import { Exclude } from 'class-transformer'

import { users } from '@db/drizzle/schema'

export type UserType = typeof users.$inferSelect

export class User implements UserType {
  id: string
  name: string
  email: string

  @Exclude()
  password: string

  companyId: string
  roleId: string
  birthday: Date | null
  genre: string | null
  updated_at: Date | null
  created_at: Date
  deleted_at: Date | null
}
