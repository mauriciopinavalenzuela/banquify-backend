import { Injectable } from '@nestjs/common';
import { Transaccion } from './entities/transacciones.entity';
import { CreateTransaccionDto } from './dto/create-transacciones.dto';  

@Injectable()
export class TransaccionesService {
  private transacciones: Transaccion[] = [];
  private id = 1;

  crearTransaccion(createTransaccionDto: CreateTransaccionDto): Transaccion {
    const nuevaTransaccion = new Transaccion(
      this.id++,
      createTransaccionDto.monto,
      createTransaccionDto.tipo,
      new Date(),
      createTransaccionDto.emisor,
      createTransaccionDto.receptor
    );
    this.transacciones.push(nuevaTransaccion);
    return nuevaTransaccion;
  }

  obtenerTransaccionPorId(id: number): Transaccion | null {
    return this.transacciones.find(t => t.id === id) || null;
  }

  obtenerTodasTransacciones(tipo?: string): Transaccion[] {
    if (tipo) {
      return this.transacciones.filter(t => t.tipo === tipo);
    }
    return this.transacciones;
  }
}
