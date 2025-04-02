import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { createUserDTO } from "./dto/usuarios.dto";
import { Usuario } from "./usuarios.entity";

@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService){}
    
    @Get()
    getUsuarios(): Promise<Usuario[]> {
        return this.usuariosService.getUsuarios();
    }

    @Post('/create')
    createUsuarios(@Body() createUserDTO: createUserDTO) {
        this.usuariosService.createUsuarios(createUserDTO);
    }
}