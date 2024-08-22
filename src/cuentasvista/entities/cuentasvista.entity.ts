export class CuentaVista {
    id: number;
    idUsuario: number;
    saldo: number;
    habilitada: boolean;
  
    constructor(id: number, idUsuario: number, saldo: number = 0, habilitada: boolean = true) {
      this.id = id;
      this.idUsuario = idUsuario;
      this.saldo = saldo;
      this.habilitada = habilitada;
    }
  }
  