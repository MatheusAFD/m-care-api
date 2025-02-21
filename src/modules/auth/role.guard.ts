import {
  Injectable,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

import { ERROR_CONSTANTS } from '@common/constants'
import { IS_PUBLIC_KEY, ROLES_KEY } from '@common/decorators/auth/'
import { RoleEnum } from '@common/enums'

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    const requiredRoles = this.reflector.getAllAndOverride<(typeof RoleEnum)[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (!requiredRoles) {
      return true
    }

    const hasRequiredRole = requiredRoles.some(
      (role) => user?.role?.type === role
    )

    if (!hasRequiredRole) {
      throw new UnauthorizedException(
        ERROR_CONSTANTS.AUTH.INSUFFICIENT_PERMISSIONS
      )
    }

    return true
  }
}
