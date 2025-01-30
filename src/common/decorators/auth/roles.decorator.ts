import { SetMetadata } from '@nestjs/common'

import { RoleEnum } from '../../enums/index'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: (keyof typeof RoleEnum)[]) =>
  SetMetadata(ROLES_KEY, roles)
