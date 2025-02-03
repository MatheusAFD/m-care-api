import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateCompanyWithUserDTO {
  @IsNotEmpty()
  @IsString()
  companyName: string

  @MinLength(14)
  @IsString()
  cnpj: string

  @IsEmail()
  email: string

  @IsString()
  userName: string

  @IsString()
  password: string
}
