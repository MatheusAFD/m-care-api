import { plans } from '@db/drizzle/schema/plans'

export type PlanType = typeof plans.$inferSelect

export class Plan implements PlanType {
  id: string
  name: string
  title: string
  description: string
  price: string
  status: 'INACTIVE' | 'ACTIVE'
  duration: number
  isRecommended: boolean
  isTrial: boolean
  isFree: boolean
  stripePriceId: string | null
  stripeProductId: string | null
  limitations: {
    maxRooms: number | 'unlimited'
    maxEmployees: number | 'unlimited'
    maxUnits: number | 'unlimited'
  }
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
