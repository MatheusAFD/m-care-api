import { Controller, Post, Body } from '@nestjs/common'

import { Public } from '@common/decorators/auth'

import { CompaniesService } from './companies.service'
import { CreateCompanyWithUserDTO } from './dto/create-company-with-user.dto'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Public()
  @Post()
  create(@Body() body: CreateCompanyWithUserDTO) {
    return this.companiesService.createWithAdmin(body)
  }
}
