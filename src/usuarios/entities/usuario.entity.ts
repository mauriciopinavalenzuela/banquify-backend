import { CuentaVista } from "cuentasvista/entities/cuentasvista.entity";


export class Usuario {
  id: number;
  nombre: string;
  correoElectronico: string;
  contrasena: string;
  puntosAcumulados: number;
  cuentaVista?: CuentaVista; 
}
