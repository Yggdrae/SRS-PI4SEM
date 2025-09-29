import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CartoesService } from './cartoes.service';
import { CreateCartaoDTO } from './dto/create-cartao.dto';
import { Cartao } from './cartoes.entity';

@Controller('cartoes')
export class CartoesController {
    constructor(private readonly cartoesService: CartoesService) { }

    @Post()
    create(@Body() data: CreateCartaoDTO): Promise<Cartao> {
        return this.cartoesService.create(data);
    }

    @Get('usuario/:usuarioId')
    findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<Cartao[]> {
        return this.cartoesService.findByUsuario(usuarioId);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.cartoesService.delete(id);
    }
}