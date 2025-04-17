import * as bcrypt from 'bcrypt';

import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Usuario } from "./usuarios.entity";
import { createUserDTO } from "./dto/usuarios.dto";
import { HttpError } from "src/http/Error";

@Injectable()
export class UsuariosService {
    constructor(@Inject('USUARIOS_REPOSITORY')
    private usuariosRepository: Repository<Usuario>) { }

    async getUsuarios(): Promise<Usuario[]> {
        const usuarios = await this.usuariosRepository.find();
        return usuarios;
    }

    async createUsuarios(createUserDTO: createUserDTO) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDTO.senha, 10);
            const usuario = this.usuariosRepository.create({
                ...createUserDTO,
                senha: hashedPassword,
                criadoEm: new Date(),
            });
        return await this.usuariosRepository.save(usuario);

        }
        catch (error) {
            console.log(error);
            return new HttpError(
                500,
                "Erro interno do servidor"
            )
        }
    }
}
