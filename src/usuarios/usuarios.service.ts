import * as bcrypt from 'bcrypt';
import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { createUserDTO } from './dto/usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('USUARIOS_REPOSITORY')
    private usuariosRepository: Repository<Usuario>,
  ) { }

  async getUsuarios(): Promise<Usuario[]> {
    return await this.usuariosRepository.find();
  }

  async getUsuarioById(id: number): Promise<Usuario | null> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    return usuario || null;
  }

  async createUsuarios(createUserDTO: createUserDTO) {
    if (!createUserDTO.email || !createUserDTO.senha || !createUserDTO.tipo) {
      throw new BadRequestException('Email, senha e tipo são obrigatórios');
    }

    try {
      const hashedPassword = await bcrypt.hash(createUserDTO.senha, 10);
      const usuario = this.usuariosRepository.create({
        ...createUserDTO,
        senha: hashedPassword,
        criadoEm: new Date(),
      });
      return await this.usuariosRepository.save(usuario);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        throw new ConflictException('O e-mail informado já está em uso');
      }
      console.error(error);
      throw new BadRequestException('Erro ao criar usuário');
    }
  }

  async updateUsuarios(
    id: number,
    updateData: Partial<createUserDTO>,
  ): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (updateData.senha) {
      updateData.senha = await bcrypt.hash(updateData.senha, 10);
    }

    Object.assign(usuario, updateData);
    return await this.usuariosRepository.save(usuario);
  }
}