import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { HorariosSalas } from "./horariosSalas.entity";

@Injectable()
export class HorariosSalasService {
    constructor(@Inject('HORARIOSSALAS_REPOSITORY') 
    private horariosSalasRepository: Repository<HorariosSalas>) {}

    getHorariosSalas() {
        return ""
    }
}
