import { Controller, Get, Param, Post, Body, Query, Res, ParseIntPipe } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccionDto } from './dto/create-transacciones.dto';  
import { UpdateTransaccionDto } from './dto/update-transacciones.dto';  
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('transacciones')
@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva transacción' })
  @ApiResponse({ status: 201, description: 'Transacción creada exitosamente.' })
  crear(@Body() createTransaccionDto: CreateTransaccionDto, @Res() response: Response) {
    const nuevaTransaccion = this.transaccionesService.crearTransaccion(createTransaccionDto);
    response.status(201).send(nuevaTransaccion);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Transacción según id' })
  @ApiResponse({ status: 200, description: 'Transacción encontrada.' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada.' })
  obtenerPorId(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const transaccion = this.transaccionesService.obtenerTransaccionPorId(id);
    if (transaccion) {
      response.status(200).send(transaccion);
    } else {
      response.status(404).send({ error: 'Transacción no encontrada' });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las Transacciones' })
  @ApiQuery({ name: 'tipo', required: false, description: 'Filtrar por tipo de transacción' })
  @ApiResponse({ status: 200, description: 'Lista de transacciones.' })
  obtenerTodas(@Query('tipo') tipo: string, @Res() response: Response) {
    const transacciones = this.transaccionesService.obtenerTodasTransacciones(tipo);
    response.status(200).send(transacciones);
  }
}
