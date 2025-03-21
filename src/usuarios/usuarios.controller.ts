import { Controller, Get } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { UsuariosInterface } from "./interface/usuarios.interface";

@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService){}
    
    @Get()
    getUsuarios(): UsuariosInterface[] {
        return this.usuariosService.getUsuarios();
    }
}