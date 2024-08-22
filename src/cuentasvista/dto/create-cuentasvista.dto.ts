import { ApiProperty } from '@nestjs/swagger';

export class CreateCuentasvistaDto {
  @ApiProperty({
    description: 'id del Usuario',
    default: 1,
  })
  idUsuario: number;

  @ApiProperty({
    description: 'si está habilitada',
    default: true,
  })
  habilitada: boolean;
}
