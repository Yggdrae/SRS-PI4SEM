import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from "typeorm";
import { Usuario } from '../usuarios/usuarios.entity';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USUARIOS_REPOSITORY')
    private usuariosRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) { }

  async login({ email, senha }: LoginDTO) {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const passwordMatches = await bcrypt.compare(senha, usuario.senha);

    if (!passwordMatches) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { sub: usuario.id, tipo: usuario.tipo };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    };
  }
}