import { Injectable } from '@nestjs/common';
import { CuentaVista } from './entities/cuentasvista.entity';
import { CreateCuentasvistaDto } from './dto/create-cuentasvista.dto';
import { UpdateCuentasvistaDto } from './dto/update-cuentasvista.dto';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class CuentasvistaService {
  private cuentasVista: CuentaVista[] = [];
  private id = 1;

  constructor(private readonly usuariosService: UsuariosService) {}

  crearCuentaVista(createCuentasvistaDto: CreateCuentasvistaDto): CuentaVista | null {
    const usuario = this.usuariosService.obtenerUsuario(createCuentasvistaDto.idUsuario);
    if (!usuario) {
      return null;
    }

    const nuevaCuentaVista = new CuentaVista(
      this.id++,
      createCuentasvistaDto.idUsuario,
      0,
      createCuentasvistaDto.habilitada || true
    );

    this.cuentasVista.push(nuevaCuentaVista);
    usuario.cuentaVista = nuevaCuentaVista;
    return nuevaCuentaVista;
  }

  obtenerCuentaVista(id: number): CuentaVista | null {
    return this.cuentasVista.find(cuenta => cuenta.id === id) || null;
  }

  obtenerTodasCuentasVista(habilitada?: boolean): CuentaVista[] {
    if (habilitada !== undefined) {
      return this.cuentasVista.filter(cuenta => cuenta.habilitada === habilitada);
    }
    return this.cuentasVista;
  }

  actualizarCuentaVista(id: number, updateCuentasvistaDto: UpdateCuentasvistaDto): CuentaVista | null {
    const cuentaVista = this.obtenerCuentaVista(id);
    if (!cuentaVista) {
      return null;  
    }
  
    cuentaVista.habilitada = updateCuentasvistaDto.habilitada ?? cuentaVista.habilitada;
  
    return cuentaVista; 
  }

  eliminarCuentaVista(id: number): boolean {
    const index = this.cuentasVista.findIndex(cuenta => cuenta.id === id);
    if (index === -1) {
      return false;
    }

    this.cuentasVista.splice(index, 1);

    const usuario = this.usuariosService.obtenerUsuarioPorCuentaVistaId(id);
    if (usuario) {
      usuario.cuentaVista = undefined;
    }
    return true;
  }
}
