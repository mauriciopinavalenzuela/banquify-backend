import { PartialType } from '@nestjs/swagger';
import { CreateCuentasvistaDto } from './create-cuentasvista.dto';

export class UpdateCuentasvistaDto extends PartialType(CreateCuentasvistaDto) {
  habilitada?: boolean;
}
