import { ApiProperty } from '@nestjs/swagger';

export class CreateTransaccionDto {
  @ApiProperty({
    description: 'Monto de la transacción',
    example: 1000,
  })
  monto: number;

  @ApiProperty({
    description: 'Tipo de transacción: "deposito", "retiro", "transferencia"',
    example: 'deposito',
  })
  tipo: 'deposito' | 'retiro' | 'transferencia';

  @ApiProperty({
    description: 'ID de la cuenta vista emisor',
    example: 1,
  })
  emisor: number;

  @ApiProperty({
    description: 'ID de la cuenta vista receptor',
    example: 2,
  })
  receptor: number;
}
