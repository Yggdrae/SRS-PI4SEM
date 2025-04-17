import { Injectable, Inject } from '@nestjs/common';
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
      throw new Error('Usuário não encontrado');
    }

    const passwordMatches = await bcrypt.compare(senha, usuario.senha);

    if (!passwordMatches) {
      throw new Error('Senha incorreta');
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