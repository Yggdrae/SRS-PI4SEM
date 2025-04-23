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
            console.log(error.message);
            throw new HttpError(500, 'O E-mail já existe' );
        }
    }

    async updateUsuarios(id:number, updateData:Partial<createUserDTO>): Promise<Usuario>{
        const usuario = await this.usuariosRepository.findOne({where: {id} });

        if (!usuario){
            throw new Error ('usuario não encontrado!');
        }
        if (updateData.senha){
            updateData.senha = await bcrypt.hash (updateData.senha, 10);
        }

        Object.assign(usuario, updateData);
        return await this.usuariosRepository.save(usuario);
    }
}
