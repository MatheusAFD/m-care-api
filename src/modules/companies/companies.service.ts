import { ForbiddenException, Inject, Injectable } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import Stripe from 'stripe'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { companies, users } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { RoleEnum } from '@common/enums'
import { encryptData } from '@common/lib'

import { CreateCompanyWithUserDTO } from './dto/create-company-with-user.dto'

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    @Inject('STRIPE_CLIENT')
    private readonly stripe: Stripe
  ) {}

  async createWithAdmin(body: CreateCompanyWithUserDTO) {
    try {
      const stripeCustomer = await this.stripe.customers.create({
        name: body.companyName,
        metadata: {
          adminName: body.userName,
          adminEmail: body.email,
          cnpj: body.cnpj
        }
      })
      if (!stripeCustomer) {
        throw new ForbiddenException('error on creating stripe customer')
      }

      await this.db.transaction(async (tx) => {
        const [company] = await tx
          .insert(companies)
          .values({
            isActive: false,
            name: body.companyName,
            cnpj: body.cnpj,
            stripeCustomerId: stripeCustomer.id
          })
          .returning()

        const adminRole = await this.db.query.roles.findFirst({
          where: (role) => eq(role.type, RoleEnum.ADMIN)
        })

        if (!adminRole) {
          throw new ForbiddenException('Admin role not found')
        }

        const hashedPassword = await encryptData(body.password)

        const [user] = await tx
          .insert(users)
          .values({
            companyId: company.id,
            email: body.email,
            name: body.userName,
            password: hashedPassword,
            roleId: adminRole.id
          })
          .returning()

        return { companyId: company.id, userId: user.id }
      })
    } catch (error) {
      return error
    }
  }
}
