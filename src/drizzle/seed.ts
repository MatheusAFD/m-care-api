import { drizzle } from 'drizzle-orm/node-postgres'
import { sql } from 'drizzle-orm'
import { env } from 'env'

import * as schema from './schema'

import { RoleEnum } from 'src/common/enums'
import { encryptData } from 'src/common/lib'

async function main() {
  const db = drizzle(process.env.DATABASE_URL!)

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

    await tx.insert(schema.companies).values({
      name: 'Grupo Nobre',
      cnpj: '26487200000104',
      cpf: '01632218046',
      isActive: true
    })

    const createdCompany = await tx
      .select()
      .from(schema.companies)
      .where(sql`(${schema.companies.name}) = 'Grupo Nobre'`)
      .limit(1)

    await tx.insert(schema.activeCompanyPlans).values({
      companyId: createdCompany[0].id,
      planId: plan[0].id,
      startDate: new Date(),
      endDate: new Date(),
      isActive: true,
      remainingDaysWithActivePlan: 30
    })

    await tx.insert(schema.users).values({
      name: 'user-super-admin',
      email: 'email@trial.com',
      password: hashedPassword,
      companyId: createdCompany[0].id,
      roleId: superAdminRole[0].id,
      birthday: null,
      genre: 'MALE'
    })

    console.log('Seed completed successfully!')
  })
}

void main()
