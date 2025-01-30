import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { eq } from 'drizzle-orm'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { compareEncryptValue } from 'src/common/lib'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'

import * as schema from '../../drizzle/schema'
import { SigninDTO } from './dto/sign-in.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
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
      throw new NotFoundException('User not found')
    }

    const isValidPassword = await compareEncryptValue(user.password, password)

    if (!isValidPassword) {
      throw new NotFoundException('User not found')
    }

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          role: user.role,
          companyId: user.companyId
        },
        {
          secret: process.env.JWT_SECRET
        }
      )
    }
  }
}
