import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
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
        return this.usuariosService.createUsuarios(createUserDTO);
    }

    @Put('/:id')
    updateUsuarios(@Param('id',ParseIntPipe)id: number,
    @Body() updateData: Partial<createUserDTO>): Promise<Usuario>{
        return this.usuariosService.updateUsuarios(id, updateData);
    }
        
}