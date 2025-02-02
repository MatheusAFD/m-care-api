import { RoleEnum } from '@common/enums/db-enums'

export class AuthUser {
  id: string
  companyId: string
  role: {
    id: string
    type: typeof RoleEnum
  }
  iat: number
  exp: number
}
