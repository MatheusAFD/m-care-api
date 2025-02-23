import { rooms } from '@db/drizzle/schema'

export type RoomType = typeof rooms.$inferSelect

export class Room implements RoomType {
  id: string
  name: string
  floor: string
  status: 'INACTIVE' | 'ACTIVE'
  unitId: string
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
