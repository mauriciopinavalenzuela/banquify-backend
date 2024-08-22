import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CuentasvistaModule } from './cuentasvista/cuentasvista.module';

@Module({
  imports: [UsuariosModule, CuentasvistaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
