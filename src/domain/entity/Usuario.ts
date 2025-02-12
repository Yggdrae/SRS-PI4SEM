import { EntityError } from "./EntityError";

export class Usuario {
    constructor(
        public readonly id: number,
        public readonly nome: string,
        public readonly email: string,
        public readonly senha: string,
        public readonly criadoEm: Date
    ) {
        this.validarDados();
    }

    private validarDados() {
        
    }
}
