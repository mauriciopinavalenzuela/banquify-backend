import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CuentasvistaModule } from './cuentasvista/cuentasvista.module';
import { TransaccionesModule } from './transacciones/transacciones.module';

@Module({
  imports: [UsuariosModule, CuentasvistaModule, TransaccionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
