import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SalasRecursos } from "./salasRecursos.entity";

@Injectable()
export class SalasRecursosService {
    constructor(@Inject('SALASRECURSOS_REPOSITORY') 
    private salasRecursosRepository: Repository<SalasRecursos>) {}

    getSalasRecursos() {
        return ""
    }
}
