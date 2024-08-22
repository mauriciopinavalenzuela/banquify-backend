import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity'; 
import { CuentaVista } from '../cuentasvista/entities/cuentasvista.entity';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];
  private id = 1;

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
  
}
