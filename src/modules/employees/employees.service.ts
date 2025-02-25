import { Injectable } from '@nestjs/common'

import { UpdateEmployeeDTO } from './dto/update-employee.dto'

@Injectable()
export class EmployeesService {
  findAll() {
    return `This action returns all employees`
  }

  findOne(id: string) {
    return `This action returns a #${id} employee`
  }

  update(id: string, body: UpdateEmployeeDTO) {
    return `This action updates a #${id} employee ${body}`
  }
}
