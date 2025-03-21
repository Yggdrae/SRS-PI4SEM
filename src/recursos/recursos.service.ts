import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Recursos } from "./recursos.entity";

@Injectable()
export class RecursosService {
    constructor(@Inject('RECURSOS_REPOSITORY') 
    private recursosRepository: Repository<Recursos>) {}

    getRecursos() {
        return ""
    }
}
