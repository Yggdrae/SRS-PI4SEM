import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ExcecoesDisponibilidadeService } from './excecoesDisponibilidade.service';
import { CreateExcecaoDisponibilidadeDTO } from './dto/excecoesDisponibilidade.dto';
import { ExcecoesDisponibilidade } from './excecoesDisponibilidade.entity';

@Controller('excecoesDisponibilidade')
export class ExcecoesDisponibilidadeController {
    constructor(private readonly service: ExcecoesDisponibilidadeService) {}

    @Get()
    async getAll(): Promise<ExcecoesDisponibilidade[]> {
        return this.service.findAll();
    }

    @Post()
    async create(@Body() dto: CreateExcecaoDisponibilidadeDTO): Promise<ExcecoesDisponibilidade> {
        return this.service.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.delete(id);
    }
}