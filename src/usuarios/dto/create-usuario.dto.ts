import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    default: 'su nombre',  
  })
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    default: 'su correo',  
  })
  correoElectronico: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    default: '12345',  
  })
  contrasena: string;

  
  
}
