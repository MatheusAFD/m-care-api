import { Employee } from '../entities/employee.entity'

export interface GetOneEmployeeResponse extends Employee {
  email: string
  genre: string | null
}
