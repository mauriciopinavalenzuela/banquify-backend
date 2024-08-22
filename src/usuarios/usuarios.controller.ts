import { Controller, Post, Body, Get, Param, Put, Delete, Query, Res, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error al crear el usuario.' })
  crear(@Body() createUsuarioDto: CreateUsuarioDto, @Res() response: Response) {
    const usuario = this.usuariosService.crearUsuario(createUsuarioDto);
    if (usuario) {
      response.status(201).send(usuario);
    } else {
      response.status(400).send({ error: 'Ya existe un usuario con este correo' });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Usuario según id' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  obtenerPorId(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const usuario = this.usuariosService.obtenerUsuario(id);
    if (usuario) {
      response.status(200).send(usuario);
    } else {
      response.status(404).send({ error: 'Usuario no encontrado' });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  obtenerTodos(@Query('nombre') nombre: string, @Res() response: Response) {
    const usuarios = this.usuariosService.obtenerTodosUsuarios(nombre);
    response.status(200).send(usuarios);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modificar Usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 400, description: 'Correo electrónico ya en uso.' })
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() updateData: UpdateUsuarioDto, @Res() response: Response) {
    const usuario = this.usuariosService.actualizarUsuario(id, updateData);
    if (usuario) {
      response.status(200).send(usuario);
    } else {
      const correoExistente = this.usuariosService.obtenerUsuarioPorCorreo(updateData.correoElectronico);
      if (correoExistente) {
        response.status(400).send({ error: 'Ya existe un usuario con este correo' });
      } else {
        response.status(404).send({ error: 'Usuario no encontrado' });
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Usuario por id' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  eliminar(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const resultado = this.usuariosService.eliminarUsuario(id);
    if (resultado) {
      response.status(200).send({ message: 'Usuario eliminado' });
    } else {
      response.status(404).send({ error: 'Usuario no encontrado' });
    }
  }
}
