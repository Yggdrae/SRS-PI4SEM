import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { RecursosService } from "./recursos.service";
import { Recursos } from "./recursos.entity";

@Controller('recursos')
export class RecursosController {
    constructor(private recursosService: RecursosService) {}

    @Get()
    getRecursos(): Promise<Recursos[]> {
        return this.recursosService.getRecursos();
    }

    @Post()
    createRecurso(@Body() data: { nome: string }): Promise<Recursos> {
        return this.recursosService.createRecurso(data);
    }

    @Put(':id')
    updateRecurso(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<Recursos>): Promise<Recursos> {
        return this.recursosService.updateRecurso(id, data);
    }

    @Delete(':id')
    deleteRecurso(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.recursosService.deleteRecurso(id);
    }
}
