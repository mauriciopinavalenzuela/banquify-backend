import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity'; 
import { CuentaVista } from '../cuentasvista/entities/cuentasvista.entity';
import { CreateTransaccionDto } from 'transacciones/dto/create-transacciones.dto';
import { Transaccion } from 'transacciones/entities/transacciones.entity';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];
  private id = 1;
  cuentasvistaService: any;

  crearUsuario(createUsuarioDto: CreateUsuarioDto): Usuario {
    const usuarioExistente = this.obtenerUsuarioPorCorreo(createUsuarioDto.correoElectronico);
    if (usuarioExistente) {
      return null;
    }

    const nuevoUsuario = new Usuario();
    nuevoUsuario.id = this.id++;
    nuevoUsuario.nombre = createUsuarioDto.nombre || 'su nombre';
    nuevoUsuario.correoElectronico = createUsuarioDto.correoElectronico || 'su correo';
    nuevoUsuario.contrasena = createUsuarioDto.contrasena || '12345';
    nuevoUsuario.puntosAcumulados = 0;  
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  obtenerUsuario(id: number): Usuario | null {
    return this.usuarios.find(user => user.id === id) || null;
  }

  obtenerTodosUsuarios(nombre: string): Usuario[] {
    return this.usuarios.filter(user => !nombre || user.nombre.includes(nombre));
  }

  actualizarUsuario(id: number, datosActualizacion: UpdateUsuarioDto): Usuario | null {
    const usuario = this.obtenerUsuario(id);
    if (!usuario) {
      return null;
    }

    let actualizado = false;

    if (datosActualizacion.correoElectronico && datosActualizacion.correoElectronico !== usuario.correoElectronico) {
      const correoExistente = this.obtenerUsuarioPorCorreo(datosActualizacion.correoElectronico);
      if (correoExistente) {
        return null;
      }
      usuario.correoElectronico = datosActualizacion.correoElectronico;
      actualizado = true;
    }

    if (datosActualizacion.contrasena) {
      usuario.contrasena = datosActualizacion.contrasena;
      actualizado = true;
    }

    return actualizado ? usuario : null;
  }

  eliminarUsuario(id: number): boolean {
    const index = this.usuarios.findIndex(user => user.id === id);
    if (index === -1) {
      return false;
    }
    this.usuarios.splice(index, 1);
    return true;
  }

  obtenerUsuarioPorCorreo(correoElectronico: string): Usuario | null {
    return this.usuarios.find(user => user.correoElectronico === correoElectronico) || null;
  }

  obtenerUsuarioPorCuentaVistaId(cuentaVistaId: number): Usuario | null {
    return this.usuarios.find(user => user.cuentaVista?.id === cuentaVistaId) || null;
  }

  // Versión 2.0 

  realizarTransferencia(transferenciaDto: CreateTransaccionDto) {
    const emisor = this.obtenerUsuario(transferenciaDto.emisor);
    const receptorCuenta = this.cuentasvistaService.obtenerCuentaVista(transferenciaDto.receptor);

    if (!emisor) return { success: false, status: 404, message: 'Usuario emisor no encontrado.' };
    if (!emisor.cuentaVista) return { success: false, status: 400, message: 'El usuario no tiene cuenta vista asignada.' };
    if (!receptorCuenta) return { success: false, status: 400, message: 'Cuenta vista del receptor no encontrada.' };
    if (emisor.cuentaVista.saldo < transferenciaDto.monto) {
      return { success: false, status: 500, message: 'Saldo insuficiente.' };
    }

    emisor.cuentaVista.saldo -= transferenciaDto.monto;
    receptorCuenta.saldo += transferenciaDto.monto;

    const transaccionEmisor = new Transaccion({
      ...transferenciaDto,
      id: Date.now(), 
    });
    const transaccionReceptor = new Transaccion({
      ...transferenciaDto,
      id: Date.now(), 
    });

    emisor.cuentaVista.historialTransacciones.push(transaccionEmisor);
    receptorCuenta.historialTransacciones.push(transaccionReceptor);

    emisor.puntosAcumulados += 5;

    return { success: true, message: 'Transferencia realizada con éxito.' };
  }

  realizarAbono(abonoDto: CreateTransaccionDto) {
    const usuario = this.obtenerUsuario(abonoDto.emisor);
    if (!usuario) return { success: false, status: 404, message: 'Usuario no encontrado.' };
    if (!usuario.cuentaVista) return { success: false, status: 400, message: 'El usuario no tiene cuenta vista asignada.' };

    usuario.cuentaVista.saldo += abonoDto.monto;

    const transaccion = new Transaccion({
      ...abonoDto,
      id: Date.now(), 
    });
    usuario.cuentaVista.historialTransacciones.push(transaccion);

    return { success: true, message: 'Abono realizado con éxito.' };
  }

  realizarRetiro(retiroDto: CreateTransaccionDto) {
    const usuario = this.obtenerUsuario(retiroDto.emisor);
    if (!usuario) return { success: false, status: 404, message: 'Usuario no encontrado.' };
    if (!usuario.cuentaVista) return { success: false, status: 400, message: 'El usuario no tiene cuenta vista asignada.' };
    if (usuario.cuentaVista.saldo < retiroDto.monto) {
      return { success: false, status: 500, message: 'Saldo insuficiente.' };
    }

    usuario.cuentaVista.saldo -= retiroDto.monto;

    const transaccion = new Transaccion({
      ...retiroDto,
      id: Date.now(), 
    });
    usuario.cuentaVista.historialTransacciones.push(transaccion);

    return { success: true, message: 'Retiro realizado con éxito.' };
  }

  obtenerTransacciones(idUsuario: number, tipo?: string) {
    const usuario = this.obtenerUsuario(idUsuario);
    if (!usuario || !usuario.cuentaVista) return null;

    if (tipo) {
      return usuario.cuentaVista.historialTransacciones.filter(transaccion => transaccion.tipo === tipo);
    }
    return usuario.cuentaVista.historialTransacciones;
  }

  
}
