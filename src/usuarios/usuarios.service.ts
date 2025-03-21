import { Inject, Injectable } from "@nestjs/common";
import { UsuariosInterface } from "./interface/usuarios.interface";
import { Repository } from "typeorm";
import { Usuario } from "./usuarios.entity";

@Injectable()
export class UsuariosService {
    constructor(@Inject('USUARIOS_REPOSITORY') 
    private usuariosRepository: Repository<Usuario>) {}
    private readonly users: UsuariosInterface[] = [
        {
            id: 1,
            nome: "Renan"
        },
        {
            id: 2,
            nome: "Yuri"
        }
    ]

    getUsuarios() {
        return this.users
    }
}
