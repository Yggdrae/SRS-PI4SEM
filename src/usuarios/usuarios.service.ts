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

    createUsuarios(createUserDTO: createUserDTO) {
        try {
            this.usuariosRepository.save({ ...createUserDTO, criadoEm: new Date() })
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
