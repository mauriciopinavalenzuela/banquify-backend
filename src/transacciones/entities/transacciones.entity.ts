import { CreateTransaccionDto } from '../dto/create-transacciones.dto';

export class Transaccion {
  id: number;
  monto: number;
  tipo: 'deposito' | 'retiro' | 'transferencia';
  fecha: Date;
  emisor: number;
  receptor: number;

  constructor(dto: CreateTransaccionDto & { id: number }) {
    this.id = dto.id;
    this.monto = dto.monto;
    this.tipo = dto.tipo;
    this.fecha = new Date();
    this.emisor = dto.emisor;
    this.receptor = dto.receptor;
  }
}
