import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { SalasService } from "./salas.service";
import { Salas } from "./salas.entity";
import { SalasInterface } from "./interfaces/salas.interface";

@Controller('salas')
export class SalasController {
    constructor(private salasService: SalasService) { }

    @Get()
    getSalas(): Promise<Salas[]> {
        return this.salasService.getSalas();
    }

    @Post()
    createSalas(@Body() data: SalasInterface): Promise<Salas> {
        return this.salasService.createSalas(data);
    }

    @Put(':id')
    updateSalas(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Partial<SalasInterface>
    ): Promise<Salas> {
        return this.salasService.updateSalas(id, data);
    }

    @Delete(':id')
    deleteSalas(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.salasService.deleteSalas(id);
    }

    @Get('/destaques')
    getSalasDestaque(): Promise<Salas[]> {
        return this.salasService.getSalasDestaque();
    }
    @Get(':id')
    getSalaById(@Param('id', ParseIntPipe) id: number): Promise<Salas> {
        return this.salasService.getSalaById(id);
    }


}