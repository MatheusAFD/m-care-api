import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'

import { DrizzleSchema } from '@db/drizzle/types'

import { ERROR_CONSTANTS } from '@common/constants'
import { compareEncryptValue } from '@common/lib'

import { SigninDTO } from './dto/sign-in.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    private readonly jwtService: JwtService
  ) {}

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

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        role: user.role,
        companyId: user.companyId
      })
    }
  }
}
