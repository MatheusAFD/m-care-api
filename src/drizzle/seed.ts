import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'

import { env } from 'env'
import Stripe from 'stripe'

import { RoleEnum } from '@common/enums'
import { encryptData } from '@common/lib'

import * as schema from './schema'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!)
  const stripe = new Stripe(env.STRIPE_SECRET_KEY)

  const hashedPassword = await encryptData(env.USER_FROM_SEED_PASSWORD)

  await db.transaction(async (tx) => {
    await tx
      .insert(schema.roles)
      .values([
        { type: RoleEnum.USER },
        { type: RoleEnum.ADMIN },
        { type: RoleEnum.SUPER_ADMIN }
      ])

    const superAdminRole = await tx
      .select()
      .from(schema.roles)
      .where(sql`(${schema.roles.type}) = 'SUPER_ADMIN'`)
      .limit(1)

    if (!superAdminRole[0]) {
      throw new Error('SUPER_ADMIN role not found')
    }

    await tx.insert(schema.plans).values({
      amount: '30',
      duration: 30,
      isFree: true,
      isTrial: true,
      name: 'Trial'
    })

    const plan = await tx
      .select()
      .from(schema.plans)
      .where(sql`(${schema.plans.name} = 'Trial')`)
      .limit(1)

    if (!plan[0]) {
      throw new Error('Plan not found')
    }

    const customer = await stripe.customers.create({
      name: 'Grupo Nobre'
    })

    await tx.insert(schema.companies).values({
      name: 'Grupo Nobre',
      cnpj: '26487200000104',
      cpf: '01632218046',
      isActive: true,
      stripeCustomerId: customer.id
    })

    const [createdCompany] = await tx
      .select()
      .from(schema.companies)
      .where(sql`(${schema.companies.name}) = 'Grupo Nobre'`)
      .limit(1)

    await db
      .update(schema.companies)
      .set({ stripeCustomerId: customer.id })
      .where(sql`(${schema.companies.id}) = ${createdCompany.id}`)

    await tx.insert(schema.activeCompanyPlans).values({
      companyId: createdCompany.id,
      planId: plan[0].id,
      startDate: new Date(),
      endDate: new Date(),
      isActive: true,
      remainingDaysWithActivePlan: 30,
      stripeSubscriptionId: ''
    })

    await tx.insert(schema.users).values({
      name: 'user-super-admin',
      email: 'email@trial.com',
      password: hashedPassword,
      companyId: createdCompany.id,
      roleId: superAdminRole[0].id,
      birthday: null,
      genre: 'MALE'
    })

    console.log('Seed completed successfully!')
  })
}

void main()
