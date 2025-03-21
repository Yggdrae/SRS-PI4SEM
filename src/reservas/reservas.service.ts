import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Reservas } from "./reservas.entity";

@Injectable()
export class ReservasService {
    constructor(@Inject('RESERVAS_REPOSITORY') 
    private reservasRepository: Repository<Reservas>) {}

    getReservas() {
        return ""
    }
}
