import { PartialType } from '@nestjs/swagger';
import { CreateTransaccionDto } from './create-transacciones.dto';  

export class UpdateTransaccionDto extends PartialType(CreateTransaccionDto) {}
