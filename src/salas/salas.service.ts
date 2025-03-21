import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Salas } from "./salas.entity";

@Injectable()
export class SalasService {
    constructor(@Inject('SALAS_REPOSITORY') 
    private salasRepository: Repository<Salas>) {}

    getSalas() {
        return ""
    }
}
