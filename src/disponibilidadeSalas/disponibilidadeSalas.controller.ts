import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DisponibilidadeSalasService } from './disponibilidadeSalas.service';
import { CreateDisponibilidadeSalasDTO } from './dto/disponibilidadeSalas.dto';
import { DisponibilidadeSalas } from './disponibilidadeSalas.entity';

@Controller('disponibilidadeSalas')
export class DisponibilidadeSalasController {
    constructor(private readonly service: DisponibilidadeSalasService) { }

    @Get('real/:salaId/:data')
    async getHorarioReal(
        @Param('salaId', ParseIntPipe) salaId: number,
        @Param('data') data: string
    ) {
        return this.service.getHorarioReal(salaId, data);
    }


    @Get()
    async getAll(): Promise<DisponibilidadeSalas[]> {
        return this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateDisponibilidadeSalasDTO): Promise<DisponibilidadeSalas> {
        return this.service.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.delete(id);
    }
}
