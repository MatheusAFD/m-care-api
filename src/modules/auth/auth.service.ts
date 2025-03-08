import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { eq } from 'drizzle-orm'

import { env } from 'env'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'

import { DrizzleSchema } from '@db/drizzle/types'

import { ERROR_CONSTANTS } from '@common/constants'
import { compareEncryptValue } from '@common/lib'

import { SigninDTO, RefreshTokenDTO } from './dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    private readonly jwtService: JwtService
  ) {}

  private async generateJwtTokens(user: {
    id: string
    role: { type: string }
    companyId: string
  }) {
    const jwtPayload = {
      id: user.id,
      role: user.role,
      companyId: user.companyId
    }

    const accessToken = this.jwtService.sign(jwtPayload, {
      expiresIn: '30s',
      secret: env.JWT_SECRET
    })

    const refreshToken = this.jwtService.sign(jwtPayload, {
      expiresIn: '60s',
      secret: env.JWT_REFRESH_SECRET
    })

    return { accessToken, refreshToken }
  }

  private async verifyRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new NotFoundException('User not found')
    }

    const decodedToken = this.jwtService.decode(refreshToken) as {
      id: string
    }

    if (!decodedToken || !decodedToken.id) {
      throw new UnauthorizedException('Invalid token')
    }

    const user = await this.db.query.users.findFirst({
      where: (user) => eq(user.id, decodedToken.id),
      with: {
        role: {
          columns: {
            id: true,
            type: true
          }
        }
      }
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: env.JWT_REFRESH_SECRET
      })
      return user
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid signature')
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired')
      }
      throw new UnauthorizedException(err.name)
    }
  }

  async signin({ email, password }: SigninDTO) {
    const user = await this.db.query.users.findFirst({
      where: (user) => {
        return eq(user.email, email)
      },
      with: {
        role: {
          columns: {
            id: true,
            type: true
          }
        }
      }
    })

    if (!user) {
      throw new NotFoundException(ERROR_CONSTANTS.USER.NOT_FOUND)
    }

    const isValidPassword = await compareEncryptValue(user.password, password)

    if (!isValidPassword) {
      throw new NotFoundException(ERROR_CONSTANTS.USER.NOT_FOUND)
    }

    const { accessToken, refreshToken } = await this.generateJwtTokens({
      id: user.id,
      role: user.role,
      companyId: user.companyId
    })

    return {
      accessToken,
      refreshToken
    }
  }

  async refreshToken({ refreshToken }: RefreshTokenDTO) {
    const user = await this.verifyRefreshToken(refreshToken)

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateJwtTokens({
        id: user.id,
        role: user.role,
        companyId: user.companyId
      })

    return {
      accessToken,
      refreshToken: newRefreshToken
    }
  }
}
