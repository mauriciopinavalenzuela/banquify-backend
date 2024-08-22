import { Module } from '@nestjs/common';
import { CuentasvistaService } from './cuentasvista.service';
import { CuentasvistaController } from './cuentasvista.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [CuentasvistaController],
  providers: [CuentasvistaService],
})
export class CuentasvistaModule {}
