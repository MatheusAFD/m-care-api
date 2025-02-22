import { PartialType } from '@nestjs/swagger'

import { CreateUnitDTO } from './create-unit.dto'

export class UpdateUnitDTO extends PartialType(CreateUnitDTO) {}
