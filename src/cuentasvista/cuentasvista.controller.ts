import { Controller, Post, Body, Get, Param, Put, Delete, Query, Res, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { CuentasvistaService } from './cuentasvista.service';
import { CreateCuentasvistaDto } from './dto/create-cuentasvista.dto'; 
import { UpdateCuentasvistaDto } from './dto/update-cuentasvista.dto';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('cuentasvista')
@Controller('cuentasvista')
export class CuentasvistaController {
  constructor(private readonly cuentasvistaService: CuentasvistaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Cuenta Vista' })
  @ApiResponse({ status: 201, description: 'Cuenta vista creada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  crear(@Body() createCuentasvistaDto: CreateCuentasvistaDto, @Res() response: Response) { 
    const cuentaVista = this.cuentasvistaService.crearCuentaVista(createCuentasvistaDto);
    if (cuentaVista) {
      response.status(201).send(cuentaVista);
    } else {
      response.status(404).send({ error: 'Usuario no encontrado' });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Cuenta Vista según id' })
  @ApiResponse({ status: 200, description: 'Cuenta vista encontrada.' })
  @ApiResponse({ status: 404, description: 'Cuenta vista no encontrada.' })
  obtenerPorId(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const cuentaVista = this.cuentasvistaService.obtenerCuentaVista(id);
    if (cuentaVista) {
      response.status(200).send(cuentaVista);
    } else {
      response.status(404).send({ error: 'Cuenta vista no encontrada' });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las Cuentas Vista' })
  @ApiQuery({ name: 'habilitada', required: false, description: 'Filtrar por estado habilitada' })
  @ApiResponse({ status: 200, description: 'Lista de cuentas vista.' })
  obtenerTodas(@Query('habilitada', new ParseBoolPipe({ optional: true })) habilitada: boolean, @Res() response: Response) {
    const cuentasVista = this.cuentasvistaService.obtenerTodasCuentasVista(habilitada);
    response.status(200).send(cuentasVista);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modificar Cuenta Vista' })
  @ApiResponse({ status: 200, description: 'Cuenta vista actualizada.' })
  @ApiResponse({ status: 404, description: 'Cuenta vista no encontrada.' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCuentasvistaDto: UpdateCuentasvistaDto,
    @Res() response: Response
  ) {
    const cuentaVista = this.cuentasvistaService.actualizarCuentaVista(id, updateCuentasvistaDto);
    if (cuentaVista) {
      response.status(200).send(cuentaVista);
    } else {
      response.status(404).send({ error: 'Cuenta vista no encontrada' });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Cuenta Vista por id' })
  @ApiResponse({ status: 200, description: 'Cuenta vista eliminada.' })
  @ApiResponse({ status: 404, description: 'Cuenta vista no encontrada.' })
  eliminar(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const resultado = this.cuentasvistaService.eliminarCuentaVista(id);
    if (resultado) {
      response.status(200).send({ message: 'Cuenta vista eliminada' });
    } else {
      response.status(404).send({ error: 'Cuenta vista no encontrada' });
    }
  }
}
