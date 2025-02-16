import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { eq, getTableColumns } from 'drizzle-orm'

import { plainToClass } from 'class-transformer'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { activeCompanyPlans, companies, roles, users } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async getMe(userId: string) {
    const [user] = await this.db
      .select({
        ...getTableColumns(users),
        roles: {
          type: roles.type
        },
        companies: {
          id: companies.id,
          name: companies.name,
          isActive: companies.isActive
        },
        activeCompanyPlans: {
          isActive: activeCompanyPlans.isActive,
          remainingDaysWithActivePlan:
            activeCompanyPlans.remainingDaysWithActivePlan,
          startDate: activeCompanyPlans.startDate,
          endDate: activeCompanyPlans.endDate
        }
      })
      .from(users)
      .where(eq(users.id, userId))
      .innerJoin(companies, eq(users.companyId, companies.id))
      .leftJoin(roles, eq(users.roleId, roles.id))
      .leftJoin(
        activeCompanyPlans,
        eq(activeCompanyPlans.companyId, companies.id)
      )
      .limit(1)

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return plainToClass(User, user)
  }
}
