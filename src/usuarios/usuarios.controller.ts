// src/usuarios/usuarios.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { createUserDTO } from './dto/usuarios.dto';
import { Usuario } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  getUsuarios(): Promise<Usuario[]> {
    return this.usuariosService.getUsuarios();
  }

  @Get('/:id')
  async getUsuarioById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Usuario> {
    const usuario = await this.usuariosService.getUsuarioById(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  @Post('/create')
  createUsuarios(@Body() createUserDTO: createUserDTO) {
    return this.usuariosService.createUsuarios(createUserDTO);
  }

  @Put('/:id')
  updateUsuarios(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<createUserDTO>,
  ): Promise<Usuario> {
    return this.usuariosService.updateUsuarios(id, updateData);
  }
}
