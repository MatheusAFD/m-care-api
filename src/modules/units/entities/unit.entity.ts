import { units } from '@db/drizzle/schema'

export type PlanType = typeof units.$inferSelect

export class Unit implements PlanType {
  number: string
  id: string
  name: string
  address: string
  city: string
  state: string
  zipcode: string
  companyId: string
  status: 'INACTIVE' | 'ACTIVE'
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
