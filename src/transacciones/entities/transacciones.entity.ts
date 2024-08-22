export class Transaccion {
    id: number;
    monto: number;
    tipo: 'deposito' | 'retiro' | 'transferencia';
    fecha: Date;
    emisor: number;
    receptor: number;
  
    constructor(
      id: number,
      monto: number,
      tipo: 'deposito' | 'retiro' | 'transferencia',
      fecha: Date,
      emisor: number,
      receptor: number
    ) {
      this.id = id;
      this.monto = monto;
      this.tipo = tipo;
      this.fecha = fecha;
      this.emisor = emisor;
      this.receptor = receptor;
    }
  }
  