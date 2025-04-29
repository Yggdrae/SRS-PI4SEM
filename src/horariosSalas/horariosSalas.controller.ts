import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { HorariosSalasService } from "./horariosSalas.service";
import { HorariosSalas } from "./horariosSalas.entity";
import { HorariosSalasInterface } from "./interfaces/horariosSalas.interface";

@Controller('horarios_salas')
export class HorariosSalasController {
    constructor(private horariosSalasService: HorariosSalasService) { }

    @Get()
    getHorariosSalas(): Promise<HorariosSalas[]> {
        return this.horariosSalasService.getHorariosSalas();
    }

    @Get('sala/:id')
    getHorariosPorSala(@Param('id', ParseIntPipe) id: number): Promise<HorariosSalas[]> {
        return this.horariosSalasService.getHorariosPorSala(id);
    }


    @Post()
    createHorarioSala(@Body() data: HorariosSalasInterface): Promise<HorariosSalas> {
        return this.horariosSalasService.createHorarioSala(data);
    }

    @Put(':id')
    updateHorarioSala(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<HorariosSalasInterface>
    ): Promise<HorariosSalas> {
        return this.horariosSalasService.updateHorarioSala(id, data);
    }

    @Delete(':id')
    deleteHorarioSala(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.horariosSalasService.deleteHorarioSala(id);
    }
}
