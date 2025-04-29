import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from "typeorm";
import { Usuario } from '../usuarios/usuarios.entity';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USUARIOS_REPOSITORY')
    private usuariosRepository: Repository<Usuario>
) {}

  async login({ email, senha }: LoginDTO) {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    if (!usuario) {
      return new NotFoundException('Usuário não encontrado');
    }

    const passwordMatches = await bcrypt.compare(senha, usuario.senha);

    if (!passwordMatches) {
      return new UnauthorizedException('Senha incorreta');
    }

    return {
      message: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  }
}